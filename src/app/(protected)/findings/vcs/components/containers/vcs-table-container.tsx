'use client';

import { useState, useCallback, useMemo } from 'react';
import { toast } from 'sonner';
import type { VcsSecretFinding, VcsActiveFilters, VcsFilterCategory, FilterGroup } from '../../types/findings';
import { VcsTableView } from '../views/vcs-table-view';

type VcsTableContainerProps = {
  findings: VcsSecretFinding[];
  activeFilters: VcsActiveFilters;
  filterGroups: FilterGroup[];
  onRemoveFilter: (category: VcsFilterCategory, optionId: string) => void;
};

export function VcsTableContainer({
  findings,
  activeFilters,
  filterGroups,
  onRemoveFilter,
}: VcsTableContainerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCount, setSelectedCount] = useState(0);

  // Filter findings based on active filters
  const filteredFindings = useMemo(() => {
    return findings.filter((finding) => {
      // Check each filter category
      for (const group of filterGroups) {
        const selected = activeFilters[group.category] ?? [];
        if (selected.length === 0) continue;

        const category = group.category;
        let value: string;

        switch (category) {
          case 'severity':
            value = finding.severity;
            break;
          case 'status':
            value = finding.status;
            break;
          case 'gitProvider':
            value = finding.gitProvider;
            break;
          case 'detectorType':
            value = finding.detectorType;
            break;
          case 'blastRadius':
            value = finding.blastRadius;
            break;
          case 'secretExposure':
            value = finding.exposure;
            break;
          case 'secretValidity':
            value = finding.isValid;
            break;
          case 'repository':
            value = finding.repository ?? '';
            break;
          default:
            continue;
        }

        if (!selected.includes(value)) return false;
      }
      return true;
    });
  }, [findings, activeFilters, filterGroups]);

  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
  }, []);

  const handleDownload = useCallback(() => {
    toast.success('Download started', {
      description: 'Findings CSV will be downloaded shortly.',
    });
  }, []);

  return (
    <VcsTableView
      findings={filteredFindings}
      searchQuery={searchQuery}
      onSearchChange={handleSearchChange}
      activeFilters={activeFilters}
      filterGroups={filterGroups}
      onRemoveFilter={onRemoveFilter}
      onDownload={handleDownload}
      selectedCount={selectedCount}
    />
  );
}
