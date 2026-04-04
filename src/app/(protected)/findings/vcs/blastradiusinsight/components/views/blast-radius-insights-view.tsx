'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { BlastRadiusOutput } from '../../types/blast-radius';
import { BlastRadiusGraph } from '../helpers/blast-radius-graph';
import { GraphLegend } from '../helpers/graph-legend';
import { RiskSummaryCard } from '../helpers/risk-summary-card';
import { AttackPathsCard } from '../helpers/attack-paths-card';

interface BlastRadiusInsightsViewProps {
  data: BlastRadiusOutput;
}

export function BlastRadiusInsightsView({ data }: BlastRadiusInsightsViewProps) {
  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header with breadcrumb & back */}
      <div className="flex items-center gap-3">
        <Link
          href="/findings/vcs"
          className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Findings
        </Link>
        <div className="h-5 w-px bg-border" />
        <nav className="flex items-center gap-1 text-sm text-muted-foreground">
          <span>Findings</span>
          <span>/</span>
          <span>VCS</span>
          <span>/</span>
          <span className="font-medium text-foreground">Blast Radius Insight</span>
        </nav>
      </div>

      {/* Row 1: Risk summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RiskSummaryCard
            riskScore={data.riskScore}
            severity={data.severity}
            summary={data.summary}
          />
        </div>
        <div>
          <GraphLegend />
        </div>
      </div>

      {/* Row 2: Attack paths */}
      <AttackPathsCard attackPaths={data.attackPaths} />

      {/* Row 3: Graph */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">
          Blast Radius Visualization
        </h3>
        <BlastRadiusGraph nodes={data.nodes} edges={data.edges} />
      </div>
    </div>
  );
}
