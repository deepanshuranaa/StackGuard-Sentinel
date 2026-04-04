import type { Node, Edge } from '@xyflow/react';
import type {
  BlastRadiusServiceData,
  BlastRadiusOutput,
  BlastRadiusSummary,
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

function serviceRisk(service: BlastRadiusServiceData): RiskSeverity {
  const scopes = service.scopes ?? [];
  const writeCount = scopes.filter((s) => s.access !== 'Read').length;
  const ratio = scopes.length > 0 ? writeCount / scopes.length : 0;

  if (service.is_admin || service.key_type === 'Full Access Key') return 'Critical';
  if (ratio > 0.7) return 'High';
  if (ratio > 0.4) return 'Medium';
  return 'Low';
}

// ─── Risk scoring ────────────────────────────────────────────────
export function calculateRiskScore(services: BlastRadiusServiceData[]): {
  score: number;
  severity: RiskSeverity;
} {
  let score = 0;

  for (const svc of services) {
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
  }

  // Normalize to 0-100
  const normalized = Math.min(100, Math.round(score));

  let severity: RiskSeverity;
  if (normalized > 80) severity = 'Critical';
  else if (normalized > 50) severity = 'High';
  else if (normalized > 25) severity = 'Medium';
  else severity = 'Low';

  return { score: normalized, severity };
}

// ─── Summary builder ─────────────────────────────────────────────
export function buildSummary(services: BlastRadiusServiceData[]): BlastRadiusSummary {
  let totalScopes = 0;
  let writeAccessCount = 0;
  let readWriteAccessCount = 0;
  let readOnlyCount = 0;
  let criticalScopes = 0;
  let has2FA = false;
  let hasAdmin = false;

  for (const svc of services) {
    const scopes = svc.scopes ?? [];
    totalScopes += scopes.length;

    if (svc['2fa_required']) has2FA = true;
    if (svc.is_admin) hasAdmin = true;

    for (const scope of scopes) {
      if (scope.access === 'Write') writeAccessCount++;
      if (scope.access === 'Read & Write') readWriteAccessCount++;
      if (scope.access === 'Read') readOnlyCount++;
      if (isSensitiveScope(scope.permissions)) criticalScopes++;
    }
  }

  return {
    totalServices: services.length,
    totalScopes,
    writeAccessCount,
    readWriteAccessCount,
    readOnlyCount,
    criticalScopes,
    has2FA,
    hasAdmin,
  };
}

// ─── Attack path extraction ──────────────────────────────────────
export function extractAttackPaths(services: BlastRadiusServiceData[]): AttackPath[] {
  const paths: AttackPath[] = [];

  for (const svc of services) {
    const scopes = svc.scopes ?? [];
    // Only include non-read-only scopes as attack paths
    const riskyScopes = scopes.filter((s) => s.access !== 'Read');

    for (const scope of riskyScopes) {
      const label = scope.sub_scope
        ? `${scope.scope} → ${scope.sub_scope}`
        : scope.scope;

      let risk: RiskSeverity;
      if (scope.access === 'Admin') risk = 'Critical';
      else if (isSensitiveScope(scope.permissions)) risk = 'High';
      else if (scope.access === 'Write') risk = 'High';
      else risk = 'Medium';

      paths.push({
        steps: ['Compromised API Key', svc.service, label],
        risk,
        accessLevel: scope.access,
      });
    }
  }

  // Sort by risk (Critical first)
  const riskOrder: Record<RiskSeverity, number> = { Critical: 0, High: 1, Medium: 2, Low: 3 };
  paths.sort((a, b) => riskOrder[a.risk] - riskOrder[b.risk]);

  return paths.slice(0, 15); // Top 15 most critical
}

// ─── Node & Edge builders ────────────────────────────────────────
export function buildNodesAndEdges(
  services: BlastRadiusServiceData[],
  riskScore: number,
  severity: RiskSeverity
): { nodes: Node[]; edges: Edge[] } {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  const SCOPE_SPACING = 160;
  const SCOPE_Y = 420;
  const SERVICE_Y = 180;
  const SERVICE_GAP = 60; // extra gap between service scope clusters

  // ── Phase 1: Collect scope groups per service ──────────────────
  interface ScopeGroup {
    svcId: string;
    service: string;
    groupName: string;
    groupScopes: BlastRadiusServiceData['scopes'] & object;
    highestAccess: AccessLevel;
    totalPerms: number;
    subScopeNames: string;
  }

  const serviceScopeGroups: { svcId: string; svc: BlastRadiusServiceData; groups: ScopeGroup[] }[] = [];

  for (const svc of services) {
    const svcId = svc.service.toLowerCase().replace(/\s+/g, '-');
    const scopes = svc.scopes ?? [];

    const scopeMap = new Map<string, typeof scopes>();
    for (const scope of scopes) {
      const key = scope.scope;
      if (!scopeMap.has(key)) scopeMap.set(key, []);
      scopeMap.get(key)!.push(scope);
    }

    const groups: ScopeGroup[] = [];
    for (const [groupName, groupScopes] of scopeMap.entries()) {
      const highestAccess = groupScopes.reduce<AccessLevel>((best, s) => {
        const order: AccessLevel[] = ['Read', 'Write', 'Read & Write', 'Admin'];
        return order.indexOf(s.access) > order.indexOf(best) ? s.access : best;
      }, 'Read');

      const subScopeNames = groupScopes
        .map((s) => s.sub_scope)
        .filter(Boolean)
        .join(', ');

      const totalPerms = groupScopes.reduce((sum, s) => sum + s.permissions.length, 0);

      groups.push({ svcId, service: svc.service, groupName, groupScopes, highestAccess, totalPerms, subScopeNames });
    }

    serviceScopeGroups.push({ svcId, svc, groups });
  }

  // ── Phase 2: Lay out all scope nodes sequentially ──────────────
  let scopeCursor = 0; // running x index across all scope groups

  const serviceRanges: { svcId: string; svc: BlastRadiusServiceData; startX: number; endX: number }[] = [];

  for (const { svcId, svc, groups } of serviceScopeGroups) {
    const startIdx = scopeCursor;

    for (const group of groups) {
      const scopeId = `${svcId}-${group.groupName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
      const x = scopeCursor * SCOPE_SPACING;

      nodes.push({
        id: scopeId,
        type: 'scopeNode',
        position: { x, y: SCOPE_Y },
        data: {
          label: group.groupName,
          access: group.highestAccess,
          parentService: group.service,
          subScope: group.subScopeNames || undefined,
          permissionCount: group.totalPerms,
        } satisfies ScopeNodeData,
      });

      edges.push({
        id: `${svcId}-${scopeId}`,
        source: svcId,
        target: scopeId,
        animated: group.highestAccess !== 'Read',
        style: {
          stroke: edgeColor(group.highestAccess),
          strokeWidth: group.highestAccess === 'Read' ? 1 : 2,
        },
      });

      scopeCursor++;
    }

    const startX = startIdx * SCOPE_SPACING;
    const endX = (scopeCursor - 1) * SCOPE_SPACING;
    serviceRanges.push({ svcId, svc, startX, endX });

    // Add gap between service clusters
    scopeCursor += SERVICE_GAP / SCOPE_SPACING;
  }

  // ── Phase 3: Center service nodes above their scope ranges ─────
  for (const { svcId, svc, startX, endX } of serviceRanges) {
    const svcX = (startX + endX) / 2 - 40; // offset to roughly center the node card
    const risk = serviceRisk(svc);

    nodes.push({
      id: svcId,
      type: 'serviceNode',
      position: { x: svcX, y: SERVICE_Y },
      data: {
        label: svc.service,
        service: svc.service,
        keyType: svc.key_type ?? 'Unknown',
        scopeCount: (svc.scopes ?? []).length,
        has2FA: svc['2fa_required'] ?? false,
        isRestricted: svc.is_restricted ?? false,
        risk,
      } satisfies ServiceNodeData,
    });

    edges.push({
      id: `identity-${svcId}`,
      source: 'identity',
      target: svcId,
      animated: risk === 'Critical' || risk === 'High',
      style: {
        stroke: risk === 'Critical' ? '#dc2626' : risk === 'High' ? '#ea580c' : '#6b7280',
        strokeWidth: 2,
      },
    });
  }

  // ── Phase 4: Center identity node above all services ───────────
  const allSvcXs = serviceRanges.map((r) => (r.startX + r.endX) / 2);
  const minSvcX = Math.min(...allSvcXs);
  const maxSvcX = Math.max(...allSvcXs);
  const rootX = (minSvcX + maxSvcX) / 2 - 60;

  nodes.push({
    id: 'identity',
    type: 'identityNode',
    position: { x: rootX, y: 0 },
    data: {
      label: 'Compromised API Key',
      riskScore,
      severity,
    } satisfies IdentityNodeData,
  });

  return { nodes, edges };
}

// ─── Master transformation ───────────────────────────────────────
export function transformBlastRadiusData(
  services: BlastRadiusServiceData[]
): BlastRadiusOutput {
  const { score, severity } = calculateRiskScore(services);
  const summary = buildSummary(services);
  const attackPaths = extractAttackPaths(services);
  const { nodes, edges } = buildNodesAndEdges(services, score, severity);

  return {
    nodes,
    edges,
    riskScore: score,
    severity,
    summary,
    attackPaths,
  };
}
