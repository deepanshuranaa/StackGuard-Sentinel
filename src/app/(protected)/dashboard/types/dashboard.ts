import type { LucideIcon } from 'lucide-react';

export type FilterCategory =
  | 'severity'
  | 'identityType'
  | 'accessScope'
  | 'resourceType'
  | 'exposureLevel'
  | 'lastUsed'
  | 'environment'
  | 'blastRadius'
  | 'ownership'
  | 'attackPath'
  | 'permissionRisk'
  | 'creationAge'
  | 'anomalies';

export type FilterOption = {
  id: string;
  label: string;
};

export type FilterGroup = {
  category: FilterCategory;
  label: string;
  icon: LucideIcon;
  options: FilterOption[];
  defaultSelected?: string[];
};

export type ActiveFilters = Record<FilterCategory, string[]>;

export type SyncState = {
  lastSyncedAt: number | null;
  isSyncing: boolean;
};
