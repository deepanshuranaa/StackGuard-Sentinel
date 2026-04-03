'use client';

import { OverallRiskCard } from '../helpers/overall-risk-card';
import { SecretsSeverityCard } from '../helpers/secrets-severity-card';
import { QuickSummaryCard } from '../helpers/quick-summary-card';
import { RiskTrendCard } from '../helpers/risk-trend-card';

export function DashboardOverviewView() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-[auto_auto]">
      {/* Row 1, Col 1 */}
      <OverallRiskCard />

      {/* Row 1, Col 2 */}
      <SecretsSeverityCard />

      {/* Row 1+2, Col 3 — spans 2 rows on desktop */}
      <div className="lg:row-span-2">
        <QuickSummaryCard />
      </div>

      {/* Row 2, Col 1+2 — spans 2 columns on desktop */}
      <div className="md:col-span-2">
        <RiskTrendCard />
      </div>
    </div>
  );
}
