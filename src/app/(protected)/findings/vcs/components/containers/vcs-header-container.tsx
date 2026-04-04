'use client';

import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { vcsFilterConfig } from '../../lib/vcs-filter-config';
import {
  formatTimeAgo,
  getSyncTimestamp,
  setSyncTimestamp,
} from '@/app/(protected)/dashboard/lib/dashboard-util';
import type { VcsActiveFilters, VcsSortBy } from '../../types/findings';
import { VcsHeaderView } from '../views/vcs-header-view';

type VcsHeaderContainerProps = {
  totalFindings: number;
  activeFilters: VcsActiveFilters;
  onFilterChange: (category: string, optionId: string) => void;
  onClearFilters: () => void;
};

export function VcsHeaderContainer({
  totalFindings,
  activeFilters,
  onFilterChange,
  onClearFilters,
}: VcsHeaderContainerProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastSyncedAt, setLastSyncedAt] = useState<number | null>(null);
  const [lastScanLabel, setLastScanLabel] = useState('Never scanned');
  const [sortBy, setSortBy] = useState<VcsSortBy>('severity');

  // Restore last sync timestamp on mount
  useEffect(() => {
    const stored = getSyncTimestamp();
    if (stored) {
      setLastSyncedAt(stored);
      setLastScanLabel(`Last scan completed ${formatTimeAgo(stored)}`);
    }
  }, []);

  // Update the label every 5m so "X mins ago" stays fresh
  useEffect(() => {
    if (!lastSyncedAt) return;
    const interval = setInterval(() => {
      setLastScanLabel(`Last scan completed ${formatTimeAgo(lastSyncedAt)}`);
    }, 300000); // 5 minutes
    return () => clearInterval(interval);
  }, [lastSyncedAt]);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    // Simulate refresh with 3-second delay
    setTimeout(() => {
      const now = Date.now();
      setSyncTimestamp(now);
      setLastSyncedAt(now);
      setLastScanLabel('Last scan completed just now');
      setIsRefreshing(false);
      toast.success('Findings refreshed', {
        description: 'VCS findings have been updated.',
      });
    }, 3000);
  }, []);

  const handleSortChange = useCallback((newSort: string) => {
    setSortBy(newSort as VcsSortBy);
  }, []);

  return (
    <VcsHeaderView
      totalFindings={totalFindings}
      lastScanLabel={lastScanLabel}
      isRefreshing={isRefreshing}
      onRefresh={handleRefresh}
      sortBy={sortBy}
      onSortChange={handleSortChange}
      filterGroups={vcsFilterConfig}
      activeFilters={activeFilters}
      onFilterChange={onFilterChange}
      onClearFilters={onClearFilters}
    />
  );
}
