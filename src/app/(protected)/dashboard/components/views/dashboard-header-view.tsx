'use client';

import type { ActiveFilters, FilterGroup } from '../../types/dashboard';
import { SyncButton } from '../helpers/sync-button';
import { ExportButton } from '../helpers/export-button';
import { FilterDropdown } from '../helpers/filter-dropdown';

type DashboardHeaderViewProps = {
  lastScanLabel: string;
  isSyncing: boolean;
  onSync: () => void;
  onExport: () => void;
  isExporting: boolean;
  filterGroups: FilterGroup[];
  activeFilters: ActiveFilters;
  onFilterChange: (category: string, optionId: string) => void;
  onClearFilters: () => void;
};

export function DashboardHeaderView({
  lastScanLabel,
  isSyncing,
  onSync,
  onExport,
  isExporting,
  filterGroups,
  activeFilters,
  onFilterChange,
  onClearFilters,
}: DashboardHeaderViewProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Left section – Title & description */}
      <div className="min-w-0">
        <h2 className="text-xl font-normal tracking-wide">Security overview</h2>
        <p className="text-sm text-muted-foreground">
          {lastScanLabel} · Monitoring 7,760 NHIs
        </p>
      </div>

      {/* Right section – Action buttons */}
      <div className="flex items-center gap-2">
        <SyncButton isSyncing={isSyncing} onSync={onSync} />
        <ExportButton onExport={onExport} isExporting={isExporting} />
        <FilterDropdown
          filterGroups={filterGroups}
          activeFilters={activeFilters}
          onFilterChange={onFilterChange}
          onClearAll={onClearFilters}
        />
      </div>
    </div>
  );
}
