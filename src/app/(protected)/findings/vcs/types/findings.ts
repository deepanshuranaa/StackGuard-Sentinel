import type { LucideIcon } from 'lucide-react';

// VCS-specific filter categories
export type VcsFilterCategory =
  | 'severity'
  | 'status'
  | 'gitProvider'
  | 'detectorType'
  | 'blastRadius'
  | 'secretExposure'
  | 'occurrences'
  | 'createdTime'
  | 'ownership'
  | 'secretValidity'
  | 'repository';

// Filter option structure
export type FilterOption = {
  id: string;
  label: string;
};

// Filter group with metadata for rendering
export type FilterGroup = {
  category: VcsFilterCategory;
  label: string;
  icon: LucideIcon;
  options: FilterOption[];
  defaultSelected?: string[];
};

// Active filters state
export type VcsActiveFilters = Record<VcsFilterCategory, string[]>;

// Core Finding interface for VCS
export interface VcsSecretFinding {
  id: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  detectorType: string;
  gitProvider: 'github' | 'gitlab' | 'bitbucket';
  status: 'auto_fixed' | 'ticket_created' | 'rotated' | 'moved_to_vault' | 'ignored' | 'pending';
  secret: string;
  secretMask?: string; // Masked version for display
  occurrences: number;
  blastRadius: 'low' | 'medium' | 'high';
  exposure: 'public' | 'private' | 'unknown';
  repository?: string;
  branch?: string;
  createdAt: string;
  lastDetected: string;
  owner?: string;
  isValid: 'active' | 'expired' | 'revoked';
  actions?: string[]; // Applied actions: 'auto_fixed', 'ticket_created', etc.
}

// Paginated response
export interface VcsPagedFindings {
  items: VcsSecretFinding[];
  total: number;
  pageSize: number;
  currentPage: number;
  hasMore: boolean;
}

// Sort options for VCS findings
export type VcsSortBy = 'severity' | 'created' | 'occurrences' | 'blastRadius' | 'status';
export type SortOrder = 'asc' | 'desc';
