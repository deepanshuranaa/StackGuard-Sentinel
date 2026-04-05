'use client';

import { RefreshButton } from '../helpers/refresh-button';
import { SortSelect } from '../helpers/sort-select';
import { VcsFilterDropdown } from '../helpers/vcs-filter-dropdown';
import type { FilterGroup, VcsActiveFilters, VcsSortBy } from '../../types/findings';

type VcsHeaderViewProps = {
  totalFindings: number;
  lastScanLabel: string;
  isRefreshing: boolean;
  onRefresh: () => void;
  sortBy: VcsSortBy;
  onSortChange: (sort: string) => void;
  filterGroups: FilterGroup[];
  activeFilters: VcsActiveFilters;
  onFilterChange: (category: string, optionId: string) => void;
  onClearFilters: () => void;
};

const SORT_OPTIONS = [
  { value: 'severity', label: 'Severity (High First)' },
  { value: 'created', label: 'Created (Newest First)' },
  { value: 'occurrences', label: 'Occurrences (Most First)' },
  { value: 'blastRadius', label: 'Blast Radius (Highest First)' },
  { value: 'status', label: 'Status (Pending First)' },
];

export function VcsHeaderView({
  totalFindings,
  lastScanLabel,
  isRefreshing,
  onRefresh,
  sortBy,
  onSortChange,
  filterGroups,
  activeFilters,
  onFilterChange,
  onClearFilters,
}: VcsHeaderViewProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Left section – Title & description */}
      <div className="min-w-0">
        <h2 className="text-xl font-normal tracking-wide">Findings for VCS</h2>
        <p className="text-sm text-muted-foreground">
          {lastScanLabel} • {totalFindings} findings  
        </p>
      </div>

      {/* Right section – Action buttons */}
      <div className="flex items-center gap-2">
        <RefreshButton isLoading={isRefreshing} onRefresh={onRefresh} />
        <SortSelect
          value={sortBy}
          onChange={onSortChange}
          options={SORT_OPTIONS}
        />
        <VcsFilterDropdown
          filterGroups={filterGroups}
          activeFilters={activeFilters}
          onFilterChange={onFilterChange}
          onClearAll={onClearFilters}
        />
      </div>
    </div>
  );
}
