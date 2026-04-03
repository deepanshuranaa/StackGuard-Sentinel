'use client';

import { Info, TrendingUp } from 'lucide-react';
import {
  Label,
  PolarAngleAxis,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from 'recharts';
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ChartContainer, type ChartConfig } from '@/components/ui/chart';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const riskScore = 80;

const chartData = [{ risk: riskScore, fill: 'var(--color-risk)' }];

const chartConfig = {
  risk: {
    label: 'Risk Score',
    color: 'hsl(0, 72%, 65%)',
  },
} satisfies ChartConfig;

function getRiskLabel(score: number) {
  if (score <= 25) return 'Low Risk';
  if (score <= 50) return 'Moderate Risk';
  if (score <= 75) return 'Medium Risk';
  return 'High Risk';
}

export function OverallRiskCard() {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Overall risk score</CardTitle>
        <CardAction>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="size-4 text-muted-foreground cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent>
              Aggregated risk score based on all monitored NHIs
            </TooltipContent>
          </Tooltip>
        </CardAction>
      </CardHeader>
      <CardContent className="flex items-end pb-2">
        <ChartContainer
          config={chartConfig}
          className="mx-auto w-full max-h-[160px] aspect-[2/1]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={180}
            endAngle={0}
            innerRadius={88}
            outerRadius={100}
            cy="80%"
          >
            <PolarAngleAxis
              type="number"
              domain={[0, 100]}
              angleAxisId={0}
              tick={false}
            />
            <RadialBar
              dataKey="risk"
              background
              cornerRadius={10}
              angleAxisId={0}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 24}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {riskScore}%
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 2}
                          className="fill-muted-foreground text-xs"
                        >
                          {getRiskLabel(riskScore)}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <div className="flex flex-col items-center gap-1 px-4 pb-4 pt-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Risk increased by 5.2% this month <TrendingUp className="size-4" />
        </div>
        <div className="text-xs leading-none text-muted-foreground">
          Based on 7,760 NHIs monitored over the last 30 days
        </div>
      </div>
    </Card>
  );
}
