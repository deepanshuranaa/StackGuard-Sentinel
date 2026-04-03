'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import { Separator } from '@/components/ui/separator';
import type { SourceMetric, SelectedSourceDetails, SourceBreakdown } from '../../types/insights';

interface SecretTypesChartCardProps {
  data: SourceMetric[];
  sourceName: string;
  sourceDetails: SelectedSourceDetails;
  onViewMore?: () => void;
}

const chartConfig = {
  critical: {
    label: 'Critical',
    color: 'hsl(45, 93%, 78%)',
  },
  risky: {
    label: 'Risky',
    color: 'hsl(0, 78%, 80%)',
  },
} satisfies ChartConfig;

const sourceIconMap: Record<string, string> = {
  'Slack': '/assets/icons/slack.svg',
  'GitHub': '/assets/icons/github.svg',
  'PostgreSQL': '/assets/icons/postgres.svg',
  'Anthropic': '/assets/icons/anthropic.svg',
  'GitLab': '/assets/icons/gitlab.svg',
  'OpenAI': '/assets/icons/openai.svg',
  'HashiCorp Vault': '/assets/icons/hashicorp.svg',
  'Microsoft Azure': '/assets/icons/azure.svg',
  'Hugging Face': '/assets/icons/huggingface.svg',
  'Gradio': '/assets/icons/gradio.svg',
};

export function SecretTypesChartCard({ data, sourceName, sourceDetails, onViewMore }: SecretTypesChartCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top 10 secret types in cloud storage</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="flex flex-col lg:flex-row">
          {/* Chart */}
          <div className="flex-1 px-6 pb-0">
            <ChartContainer config={chartConfig} className="h-[380px] w-full">
              <BarChart
                accessibilityLayer
                data={data}
                margin={{ left: 16, right: 12, top: 12, bottom: 24 }}
                barCategoryGap="30%"
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="name"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  fontSize={12}
                />
                <YAxis
                  label={{
                    value: 'Total Secrets',
                    angle: -90,
                    position: 'insideLeft',
                    offset: 10,
                  }}
                />
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="risky" stackId="a" fill="var(--color-risky)" radius={[0, 0, 4, 4]} maxBarSize={32} />
                <Bar dataKey="critical" stackId="a" fill="var(--color-critical)" radius={[4, 4, 0, 0]} maxBarSize={32} />
              </BarChart>
            </ChartContainer>
          </div>

          {/* Source breakdown panel */}
          <div className="m-4 w-full shrink-0 self-start overflow-hidden rounded-lg border lg:w-[220px]">
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-2">
                {sourceIconMap[sourceName] && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={sourceIconMap[sourceName]}
                    alt={sourceName}
                    width={20}
                    height={20}
                    style={{ objectFit: 'contain' }}
                  />
                )}
                <span className="text-sm font-semibold">{sourceName}</span>
              </div>
              <button
                onClick={onViewMore}
                className="rounded border border-border px-2 py-0.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                View more
              </button>
            </div>
            <Separator />
            {[
              { label: 'Selected value', value: sourceDetails.selectedValue },
              { label: 'Total', value: sourceDetails.total },
              { label: 'Critical', value: sourceDetails.critical },
              { label: 'Risky', value: sourceDetails.risky },
            ].map((row, idx) => (
              <div key={row.label}>
                <div className="flex justify-between px-4 py-2">
                  <span className="text-xs text-muted-foreground">{row.label}</span>
                  <span className="text-xs font-semibold">{row.value}</span>
                </div>
                <Separator />
              </div>
            ))}
            <div className="px-4 py-2">
              <span className="text-xs font-medium">Source breakdown</span>
            </div>
            <Separator />
            {sourceDetails.breakdown.map((item: SourceBreakdown, idx: number) => (
              <div key={`${item.name}-${idx}`}>
                <div className="flex justify-between px-4 py-2">
                  <span className="text-xs text-muted-foreground">{item.name}</span>
                  <span className="text-xs font-semibold">{item.count}</span>
                </div>
                {idx < sourceDetails.breakdown.length - 1 && <Separator />}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
