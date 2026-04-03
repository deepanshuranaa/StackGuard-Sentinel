'use client';

import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import type { ActiveFilters, FilterCategory } from '../../types/dashboard';
import { filterConfig } from '../../lib/filter-config';
import {
  formatTimeAgo,
  getSyncTimestamp,
  setSyncTimestamp,
} from '../../lib/dashboard-util';
import { DashboardHeaderView } from '../views/dashboard-header-view';

function getDefaultFilters(): ActiveFilters {
  const filters = {} as ActiveFilters;
  for (const group of filterConfig) {
    filters[group.category] = group.defaultSelected ?? [];
  }
  return filters;
}

export function DashboardHeaderContainer() {
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncedAt, setLastSyncedAt] = useState<number | null>(null);
  const [lastScanLabel, setLastScanLabel] = useState('Last scan completed 15 mins ago');
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>(getDefaultFilters);

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

  const handleSync = useCallback(() => {
    setIsSyncing(true);
    // Fake sync — spin for 2 seconds then save timestamp
    setTimeout(() => {
      const now = Date.now();
      setSyncTimestamp(now);
      setLastSyncedAt(now);
      setLastScanLabel('Last scan completed just now');
      setIsSyncing(false);
      toast.success('Sync complete', {
        description: 'Security data has been refreshed.',
      });
    }, 4000);
  }, []);

  const handleExport = useCallback(() => {
    toast.success('Export started', {
      description: 'Your security data export is being prepared.',
    });
  }, []);

  const handleFilterChange = useCallback(
    (category: string, optionId: string) => {
      setActiveFilters((prev) => {
        const key = category as FilterCategory;
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
    const cleared = {} as ActiveFilters;
    for (const group of filterConfig) {
      cleared[group.category] = [];
    }
    setActiveFilters(cleared);
  }, []);

  return (
    <DashboardHeaderView
      lastScanLabel={lastScanLabel}
      isSyncing={isSyncing}
      onSync={handleSync}
      onExport={handleExport}
      filterGroups={filterConfig}
      activeFilters={activeFilters}
      onFilterChange={handleFilterChange}
      onClearFilters={handleClearFilters}
    />
  );
}
