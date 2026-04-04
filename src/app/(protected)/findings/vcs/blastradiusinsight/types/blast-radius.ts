import type { Node, Edge } from '@xyflow/react';

// ─── Raw Input Types (from backend) ─────────────────────────────

export type AccessLevel = 'Read' | 'Write' | 'Read & Write' | 'Admin';

export interface RawScope {
  scope: string;
  sub_scope?: string;
  access: AccessLevel;
  permissions: string[];
  endpoints?: string[];
}

export interface RawRole {
  scope: string;
  permissions: string;
}

export interface RawWorkspace {
  id: string;
  name: string;
  type: string;
  visibility: string;
  link: string;
}

export interface RawOrganization {
  id: string;
  title: string;
  user: string;
  default: boolean;
  role: string;
  description?: string;
  personal?: boolean;
}

export interface RawUserInfo {
  username?: string;
  email?: string;
  full_name?: string;
  roles?: string[];
  team_domain?: string;
  team_name?: string;
}

export interface BlastRadiusServiceData {
  service: string;
  valid_key: boolean;
  key_type?: string;
  is_restricted?: boolean;
  is_admin?: boolean;
  '2fa_required'?: boolean;

  // SendGrid-style
  scopes?: RawScope[];
  total_scopes?: number;
  total_raw_scopes?: number;
  raw_scopes?: string[];

  // Postman-style
  roles?: RawRole[];
  total_roles?: number;
  workspaces?: RawWorkspace[];
  total_workspaces?: number;
  team_info?: { name: string; domain: string };

  // OpenAI-style
  organizations?: RawOrganization[];
  total_organizations?: number;
  permissions?: string;

  // Common
  user_info?: RawUserInfo | null;
  user_info_available?: boolean;
}

// ─── Transformed Output Types ────────────────────────────────────

export type RiskSeverity = 'Low' | 'Medium' | 'High' | 'Critical';

export interface IdentitySummary {
  totalScopes: number;
  writeAccessCount: number;
  readWriteAccessCount: number;
  readOnlyCount: number;
  criticalScopes: number;
  has2FA: boolean;
  hasAdmin: boolean;
  isRestricted: boolean;
  keyType: string;
}

export interface AttackPath {
  steps: string[];
  risk: RiskSeverity;
  accessLevel: AccessLevel;
}

// ─── Per-identity blast radius ───────────────────────────────────

export interface IdentityBlastRadius {
  id: string;
  service: string;
  nodes: Node[];
  edges: Edge[];
  riskScore: number;
  severity: RiskSeverity;
  summary: IdentitySummary;
  attackPaths: AttackPath[];
}

// ─── Combined output ─────────────────────────────────────────────

export interface BlastRadiusOutput {
  identities: IdentityBlastRadius[];
  nodes: Node[];   // flattened from all identities
  edges: Edge[];   // flattened from all identities
}

// ─── Node data types ─────────────────────────────────────────────

export interface IdentityNodeData {
  label: string;
  service: string;
  keyType: string;
  riskScore: number;
  severity: RiskSeverity;
  has2FA: boolean;
  isRestricted: boolean;
  [key: string]: unknown;
}

export interface ServiceNodeData {
  label: string;
  service: string;
  keyType: string;
  scopeCount: number;
  has2FA: boolean;
  isRestricted: boolean;
  risk: RiskSeverity;
  [key: string]: unknown;
}

export interface ScopeNodeData {
  label: string;
  access: AccessLevel;
  parentService: string;
  subScope?: string;
  permissionCount: number;
  [key: string]: unknown;
}

export type BlastRadiusNodeData = IdentityNodeData | ServiceNodeData | ScopeNodeData;
