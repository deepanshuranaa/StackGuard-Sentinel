'use client';

import { useRef, useState, useCallback } from 'react';
import { toast } from 'sonner';
import { DashboardHeaderContainer } from './components/containers/dashboard-header-container';
import { DashboardOverviewContainer } from './components/containers/dashboard-overview-container';
import { DashboardInsightsContainer } from './components/containers/dashboard-insights-container';
import { exportDashboardPdf } from './services/export-service';

export default function DashboardPage() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = useCallback(async () => {
    if (!contentRef.current || isExporting) return;

    setIsExporting(true);
    const toastId = toast.loading('Preparing report…');

    try {
      // Brief delay so the user sees the loading state
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await exportDashboardPdf(contentRef.current);
      toast.success('Report downloaded', {
        id: toastId,
        description: 'Your security report PDF has been saved.',
      });
    } catch {
      toast.error('Export failed', {
        id: toastId,
        description: 'Something went wrong while generating the report.',
      });
    } finally {
      setIsExporting(false);
    }
  }, [isExporting]);

  return (
    <div className="space-y-6">
      <DashboardHeaderContainer onExport={handleExport} isExporting={isExporting} />
      <div ref={contentRef} className="space-y-6">
        <DashboardOverviewContainer />
        <DashboardInsightsContainer />
      </div>
    </div>
  );
}
