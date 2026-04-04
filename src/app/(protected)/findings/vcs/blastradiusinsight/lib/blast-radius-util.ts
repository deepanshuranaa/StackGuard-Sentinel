import type { Node, Edge } from '@xyflow/react';
import type {
  BlastRadiusServiceData,
  BlastRadiusOutput,
  IdentityBlastRadius,
  IdentitySummary,
  AttackPath,
  RiskSeverity,
  AccessLevel,
  IdentityNodeData,
  ServiceNodeData,
  ScopeNodeData,
} from '../types/blast-radius';

// ─── Sensitive scope keywords (trigger higher risk) ──────────────
const SENSITIVE_KEYWORDS = [
  'api_keys', 'security', 'credentials', 'admin', 'mail.send',
  'teammates', 'user.account', 'whitelabel', 'suppression',
  'fine_tuning', 'files', 'assistants',
];

// ─── Access level risk multiplier ────────────────────────────────
function accessWeight(access: AccessLevel): number {
  switch (access) {
    case 'Admin': return 4;
    case 'Read & Write': return 2;
    case 'Write': return 3;
    case 'Read': return 0.5;
    default: return 0;
  }
}

function isSensitiveScope(permissions: string[]): boolean {
  return permissions.some((p) =>
    SENSITIVE_KEYWORDS.some((kw) => p.toLowerCase().includes(kw))
  );
}

// ─── Edge colors by access level ─────────────────────────────────
function edgeColor(access: AccessLevel): string {
  switch (access) {
    case 'Admin': return '#dc2626';
    case 'Write': return '#dc2626';
    case 'Read & Write': return '#ea580c';
    case 'Read': return '#eab308';
    default: return '#6b7280';
  }
}

// ─── Risk scoring for a SINGLE identity ──────────────────────────
function calculateIdentityRisk(svc: BlastRadiusServiceData): {
  score: number;
  severity: RiskSeverity;
} {
  let score = 0;
  const scopes = svc.scopes ?? [];

  score += scopes.length * 0.5;

  for (const scope of scopes) {
    score += accessWeight(scope.access);
    if (isSensitiveScope(scope.permissions)) score += 3;
  }

  if (svc.is_admin) score += 20;
  if (svc.key_type === 'Full Access Key') score += 15;
  if (!svc['2fa_required']) score += 5;
  if (!svc.is_restricted) score += 5;

  const normalized = Math.min(100, Math.round(score));

  let severity: RiskSeverity;
  if (normalized > 80) severity = 'Critical';
  else if (normalized > 50) severity = 'High';
  else if (normalized > 25) severity = 'Medium';
  else severity = 'Low';

  return { score: normalized, severity };
}

// ─── Summary for a SINGLE identity ──────────────────────────────
function buildIdentitySummary(svc: BlastRadiusServiceData): IdentitySummary {
  const scopes = svc.scopes ?? [];
  let writeAccessCount = 0;
  let readWriteAccessCount = 0;
  let readOnlyCount = 0;
  let criticalScopes = 0;

  for (const scope of scopes) {
    if (scope.access === 'Write') writeAccessCount++;
    if (scope.access === 'Read & Write') readWriteAccessCount++;
    if (scope.access === 'Read') readOnlyCount++;
    if (isSensitiveScope(scope.permissions)) criticalScopes++;
  }

  return {
    totalScopes: scopes.length,
    writeAccessCount,
    readWriteAccessCount,
    readOnlyCount,
    criticalScopes,
    has2FA: svc['2fa_required'] ?? false,
    hasAdmin: svc.is_admin ?? false,
    isRestricted: svc.is_restricted ?? false,
    keyType: svc.key_type ?? 'API Key',
  };
}

// ─── Attack paths for a SINGLE identity ──────────────────────────
function extractIdentityAttackPaths(svc: BlastRadiusServiceData): AttackPath[] {
  const paths: AttackPath[] = [];
  const scopes = svc.scopes ?? [];
  const riskyScopes = scopes.filter((s) => s.access !== 'Read');
  const keyLabel = svc.service + ' ' + (svc.key_type ?? 'API Key');

  for (const scope of riskyScopes) {
    const label = scope.sub_scope
      ? scope.scope + ' → ' + scope.sub_scope
      : scope.scope;

    let risk: RiskSeverity;
    if (scope.access === 'Admin') risk = 'Critical';
    else if (isSensitiveScope(scope.permissions)) risk = 'High';
    else if (scope.access === 'Write') risk = 'High';
    else risk = 'Medium';

    paths.push({
      steps: [keyLabel, svc.service, label],
      risk,
      accessLevel: scope.access,
    });
  }

  const riskOrder: Record<RiskSeverity, number> = { Critical: 0, High: 1, Medium: 2, Low: 3 };
  paths.sort((a, b) => riskOrder[a.risk] - riskOrder[b.risk]);

  return paths.slice(0, 10);
}

// ─── Build nodes & edges for a SINGLE identity subgraph ──────────
function buildIdentitySubgraph(
  svc: BlastRadiusServiceData,
  riskScore: number,
  severity: RiskSeverity,
  offsetX: number,
): { nodes: Node[]; edges: Edge[]; width: number } {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  const SCOPE_SPACING = 160;
  const SCOPE_Y = 440;
  const SERVICE_Y = 240;

  const svcId = svc.service.toLowerCase().replace(/\s+/g, '-');
  const identityId = 'identity-' + svcId;

  // ── Collect scope groups ───────────────────────────────────────
  const scopes = svc.scopes ?? [];
  const scopeMap = new Map<string, typeof scopes>();
  for (const scope of scopes) {
    if (!scopeMap.has(scope.scope)) scopeMap.set(scope.scope, []);
    scopeMap.get(scope.scope)!.push(scope);
  }

  const groupEntries = Array.from(scopeMap.entries());
  const totalGroups = groupEntries.length;
  const clusterWidth = Math.max(1, totalGroups) * SCOPE_SPACING;

  // ── Scope nodes ────────────────────────────────────────────────
  groupEntries.forEach(([groupName, groupScopes], idx) => {
    const highestAccess = groupScopes.reduce<AccessLevel>((best, s) => {
      const order: AccessLevel[] = ['Read', 'Write', 'Read & Write', 'Admin'];
      return order.indexOf(s.access) > order.indexOf(best) ? s.access : best;
    }, 'Read');

    const scopeId = svcId + '-scope-' + groupName.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const totalPerms = groupScopes.reduce((sum, s) => sum + s.permissions.length, 0);
    const subScopeNames = groupScopes.map((s) => s.sub_scope).filter(Boolean).join(', ');

    nodes.push({
      id: scopeId,
      type: 'scopeNode',
      position: { x: offsetX + idx * SCOPE_SPACING, y: SCOPE_Y },
      data: {
        label: groupName,
        access: highestAccess,
        parentService: svc.service,
        subScope: subScopeNames || undefined,
        permissionCount: totalPerms,
      } satisfies ScopeNodeData,
    });

    edges.push({
      id: svcId + '-to-' + scopeId,
      source: svcId,
      target: scopeId,
      animated: highestAccess !== 'Read',
      style: {
        stroke: edgeColor(highestAccess),
        strokeWidth: highestAccess === 'Read' ? 1 : 2,
      },
    });
  });

  // ── Service node — centered above scopes ───────────────────────
  const svcX = offsetX + (clusterWidth - SCOPE_SPACING) / 2 - 50;

  nodes.push({
    id: svcId,
    type: 'serviceNode',
    position: { x: svcX, y: SERVICE_Y },
    data: {
      label: svc.service,
      service: svc.service,
      keyType: svc.key_type ?? 'API Key',
      scopeCount: scopes.length,
      has2FA: svc['2fa_required'] ?? false,
      isRestricted: svc.is_restricted ?? false,
      risk: severity,
    } satisfies ServiceNodeData,
  });

  edges.push({
    id: identityId + '-to-' + svcId,
    source: identityId,
    target: svcId,
    animated: severity === 'Critical' || severity === 'High',
    style: {
      stroke: severity === 'Critical' ? '#dc2626' : severity === 'High' ? '#ea580c' : '#6b7280',
      strokeWidth: 2,
    },
  });

  // ── Identity node — centered above service ─────────────────────
  const identityX = svcX - 10;

  nodes.push({
    id: identityId,
    type: 'identityNode',
    position: { x: identityX, y: 0 },
    data: {
      label: svc.service + ' API Key',
      service: svc.service,
      keyType: svc.key_type ?? 'API Key',
      riskScore,
      severity,
      has2FA: svc['2fa_required'] ?? false,
      isRestricted: svc.is_restricted ?? false,
    } satisfies IdentityNodeData,
  });

  return { nodes, edges, width: clusterWidth };
}

// ─── Master transformation ───────────────────────────────────────
export function transformBlastRadiusData(
  services: BlastRadiusServiceData[]
): BlastRadiusOutput {
  const identities: IdentityBlastRadius[] = [];
  const CLUSTER_GAP = 200;

  let offsetX = 0;
  const allNodes: Node[] = [];
  const allEdges: Edge[] = [];

  for (const svc of services) {
    const { score, severity } = calculateIdentityRisk(svc);
    const summary = buildIdentitySummary(svc);
    const attackPaths = extractIdentityAttackPaths(svc);
    const { nodes, edges, width } = buildIdentitySubgraph(svc, score, severity, offsetX);

    const svcId = svc.service.toLowerCase().replace(/\s+/g, '-');

    identities.push({
      id: svcId,
      service: svc.service,
      nodes,
      edges,
      riskScore: score,
      severity,
      summary,
      attackPaths,
    });

    allNodes.push(...nodes);
    allEdges.push(...edges);

    offsetX += width + CLUSTER_GAP;
  }

  return {
    identities,
    nodes: allNodes,
    edges: allEdges,
  };
}
