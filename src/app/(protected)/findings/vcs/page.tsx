'use client';

import { useState, useCallback, useMemo } from 'react';
import { VcsHeaderContainer } from './components/containers/vcs-header-container';
import { VcsTableContainer } from './components/containers/vcs-table-container';
import { vcsFilterConfig } from './lib/vcs-filter-config';
import { generateMockFindings } from './lib/vcs-data-util';
import type { VcsActiveFilters, VcsFilterCategory } from './types/findings';

function getDefaultFilters(): VcsActiveFilters {
  const filters = {} as VcsActiveFilters;
  for (const group of vcsFilterConfig) {
    filters[group.category] = group.defaultSelected ?? [];
  }
  return filters;
}

export default function VcsPage() {
  const [activeFilters, setActiveFilters] = useState<VcsActiveFilters>(getDefaultFilters);
  const findings = useMemo(() => generateMockFindings(178), []);

  const handleFilterChange = useCallback(
    (category: string, optionId: string) => {
      setActiveFilters((prev) => {
        const key = category as VcsFilterCategory;
        const current = prev[key] ?? [];
        const next = current.includes(optionId)
          ? current.filter((id) => id !== optionId)
          : [...current, optionId];
        return { ...prev, [key]: next };
      });
    },
    []
  );

  const handleClearFilters = useCallback(() => {
    const cleared = {} as VcsActiveFilters;
    for (const group of vcsFilterConfig) {
      cleared[group.category] = [];
    }
    setActiveFilters(cleared);
  }, []);

  const handleRemoveFilter = useCallback(
    (category: VcsFilterCategory, optionId: string) => {
      setActiveFilters((prev) => ({
        ...prev,
        [category]: (prev[category] ?? []).filter((id) => id !== optionId),
      }));
    },
    []
  );

  return (
    <div className="space-y-6">
      <VcsHeaderContainer
        totalFindings={findings.length}
        activeFilters={activeFilters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
      />
      <VcsTableContainer
        findings={findings}
        activeFilters={activeFilters}
        filterGroups={vcsFilterConfig}
        onRemoveFilter={handleRemoveFilter}
      />
    </div>
  );
}
