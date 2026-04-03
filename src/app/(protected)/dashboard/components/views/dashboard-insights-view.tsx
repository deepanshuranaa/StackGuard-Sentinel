'use client';

import { SecretTypesChartCard } from '../helpers/secret-types-chart-card';
import { SourceBreakdownCard } from '../helpers/source-breakdown-card';
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
        <TabsList className="grid grid-cols-4 w-full max-w-md">
          {TAB_VALUES.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {TAB_VALUES.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="mt-4">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              {/* Chart - Takes 2/3 on desktop */}
              <div className="lg:col-span-2">
                <SecretTypesChartCard data={insightsData.metrics} />
              </div>

              {/* Stats Card - Takes 1/3 on desktop */}
              <div className="lg:col-span-1">
                <SourceBreakdownCard
                  data={insightsData.selectedSourceDetails}
                  sourceName={insightsData.selectedSource}
                  onViewMore={onViewMore}
                />
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
