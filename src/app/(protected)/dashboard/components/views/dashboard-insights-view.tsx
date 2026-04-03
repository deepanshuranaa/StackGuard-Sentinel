'use client';

import { SecretTypesChartCard } from '../helpers/secret-types-chart-card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import type { InsightsTabData, InsightsTab } from '../../types/insights';

interface DashboardInsightsViewProps {
  currentTab: InsightsTab;
  onTabChange: (tab: InsightsTab) => void;
  insightsData: InsightsTabData;
  onViewMore: () => void;
}

const TAB_VALUES: { value: InsightsTab; label: string }[] = [
  { value: 'vcs', label: 'VCS' },
  { value: 'storage', label: 'Storage/Buckets' },
  { value: 'cloud-infra', label: 'Cloud Infra' },
  { value: 'directory-services', label: 'Directory Services' },
];

export function DashboardInsightsView({
  currentTab,
  onTabChange,
  insightsData,
  onViewMore,
}: DashboardInsightsViewProps) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Non Human Identity Posture</h2>

      <Tabs value={currentTab} onValueChange={(val) => onTabChange(val as InsightsTab)}>
        <TabsList className="h-auto flex-wrap gap-1">
          {TAB_VALUES.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value} className="whitespace-nowrap">
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {TAB_VALUES.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="mt-4">
            <SecretTypesChartCard
              data={insightsData.metrics}
              sourceName={insightsData.selectedSource}
              sourceDetails={insightsData.selectedSourceDetails}
              onViewMore={onViewMore}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
