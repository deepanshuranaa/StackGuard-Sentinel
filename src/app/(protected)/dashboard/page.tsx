import { DashboardHeaderContainer } from './components/containers/dashboard-header-container';
import { DashboardOverviewContainer } from './components/containers/dashboard-overview-container';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <DashboardHeaderContainer />
      <DashboardOverviewContainer />
    </div>
  );
}
