'use client';

import { VcsHeaderContainer } from './components/containers/vcs-header-container';

// Mock: This will come from a data source/API in future
const TOTAL_FINDINGS = 178;

export default function VcsPage() {
  return (
    <div className="space-y-6">
      <VcsHeaderContainer totalFindings={TOTAL_FINDINGS} />
      {/* Findings table and additional content will come next */}
      <div className="rounded-lg border border-border p-6">
        <p className="text-sm text-muted-foreground">
          Findings table and detailed content coming in next phase...
        </p>
      </div>
    </div>
  );
}
