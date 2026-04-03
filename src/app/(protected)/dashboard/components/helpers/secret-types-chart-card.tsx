'use client';

import { TrendingUp } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  Card,
  CardContent,
  CardFooter,
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
import type { SourceMetric } from '../../types/insights';

interface SecretTypesChartCardProps {
  data: SourceMetric[];
}

const chartConfig = {
  critical: {
    label: 'Critical',
    color: 'hsl(45, 93%, 58%)',
  },
  risky: {
    label: 'Risky',
    color: 'hsl(0, 78%, 65%)',
  },
} satisfies ChartConfig;

export function SecretTypesChartCard({ data }: SecretTypesChartCardProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Top 10 secret types in cloud storage</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
              top: 12,
              bottom: 12,
            }}
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
            />
            <YAxis
              label={{
                value: 'Total Secrets',
                angle: -90,
                position: 'insideLeft',
              }}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="risky"
              stackId="a"
              fill="var(--color-risky)"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="critical"
              stackId="a"
              fill="var(--color-critical)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      {/* <div className="flex flex-col items-start gap-1 px-6 pb-4 pt-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 12.5% this month <TrendingUp className="size-4" />
        </div>
        <div className="leading-none text-muted-foreground text-xs">
          Based on top sources across selected infrastructure
        </div>
      </div> */}
    </Card>
  );
}
