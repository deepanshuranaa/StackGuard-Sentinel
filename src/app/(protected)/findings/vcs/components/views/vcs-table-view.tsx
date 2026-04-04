'use client';

import type { VcsSecretFinding, VcsActiveFilters, VcsFilterCategory, FilterGroup } from '../../types/findings';
import { vcsColumns } from '../helpers/vcs-columns';
import { DataTable } from '../helpers/data-table';
import { TableToolbar } from '../helpers/table-toolbar';
import { Card, CardContent } from '@/components/ui/card';

type VcsTableViewProps = {
  findings: VcsSecretFinding[];
  searchQuery: string;
  onSearchChange: (value: string) => void;
  activeFilters: VcsActiveFilters;
  filterGroups: FilterGroup[];
  onRemoveFilter: (category: VcsFilterCategory, optionId: string) => void;
  onDownload: () => void;
  selectedCount: number;
};

export function VcsTableView({
  findings,
  searchQuery,
  onSearchChange,
  activeFilters,
  filterGroups,
  onRemoveFilter,
  onDownload,
  selectedCount,
}: VcsTableViewProps) {
  return (
    <Card>
      <CardContent className="space-y-4 pt-6">
        <TableToolbar
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          activeFilters={activeFilters}
          filterGroups={filterGroups}
          onRemoveFilter={onRemoveFilter}
          onDownload={onDownload}
          selectedCount={selectedCount}
        />
        <DataTable columns={vcsColumns} data={findings} globalFilter={searchQuery} />
      </CardContent>
    </Card>
  );
}
