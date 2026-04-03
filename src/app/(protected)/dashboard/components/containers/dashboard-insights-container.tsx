'use client';

import { useState } from 'react';
import { DashboardInsightsView } from '../views/dashboard-insights-view';
import { getInsightsDataByTab } from '../../lib/dashboard-util';
import type { InsightsTab } from '../../types/insights';

export function DashboardInsightsContainer() {
  const [currentTab, setCurrentTab] = useState<InsightsTab>('vcs');
  const insightsData = getInsightsDataByTab(currentTab);

  const handleTabChange = (tab: InsightsTab) => {
    setCurrentTab(tab);
  };

  const handleViewMore = () => {
    // TODO: Navigate to detailed insights page or open modal
    console.log(`View more details for ${insightsData.selectedSource}`);
  };

  return (
    <DashboardInsightsView
      currentTab={currentTab}
      onTabChange={handleTabChange}
      insightsData={insightsData}
      onViewMore={handleViewMore}
    />
  );
}
