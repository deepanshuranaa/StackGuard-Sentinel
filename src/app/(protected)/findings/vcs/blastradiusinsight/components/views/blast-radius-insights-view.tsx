'use client';

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
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <nav className="flex items-center gap-1 text-sm text-muted-foreground">
          <span>Findings</span>
          <span>/</span>
          <span>VCS</span>
          <span>/</span>
          <span className="font-medium text-foreground">Blast Radius Insight</span>
        </nav>
        <span className="ml-auto text-xs text-muted-foreground">
          {data.identities.length} independent identit{data.identities.length === 1 ? 'y' : 'ies'}
        </span>
      </div>

      {/* Row 1: Per-identity risk summaries + legend */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RiskSummaryCard identities={data.identities} />
        </div>
        <div>
          <GraphLegend />
        </div>
      </div>

      {/* Row 2: Per-identity attack paths */}
      <AttackPathsCard identities={data.identities} />

      {/* Row 3: Graph — all identities rendered as independent subgraphs */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">
          Blast Radius Visualization
        </h3>
        <BlastRadiusGraph nodes={data.nodes} edges={data.edges} />
      </div>
    </div>
  );
}
