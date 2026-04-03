'use client';

import { OverallRiskCard } from '../helpers/overall-risk-card';
import { SecretsSeverityCard } from '../helpers/secrets-severity-card';
import { QuickSummaryCard } from '../helpers/quick-summary-card';
import { RiskTrendCard } from '../helpers/risk-trend-card';

export function DashboardOverviewView() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1fr_minmax(280px,1fr)]">
      {/* Left 2 columns — independent flow */}
      <div className="col-span-1 grid grid-cols-1 gap-4 self-start md:grid-cols-2 lg:col-span-2">
        <OverallRiskCard />
        <SecretsSeverityCard />
        <div className="md:col-span-2">
          <RiskTrendCard />
        </div>
      </div>

      {/* Right column — Quick Summary */}
      <QuickSummaryCard />
    </div>
  );
}
