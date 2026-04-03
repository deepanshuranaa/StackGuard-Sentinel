'use client';

import { Info, TrendingUp } from 'lucide-react';
import {
  Label,
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
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const chartData = [{ month: 'current', critical: 1200, high: 520, medium: 240, low: 100 }];

const totalSecrets =
  chartData[0].critical +
  chartData[0].high +
  chartData[0].medium +
  chartData[0].low;

const chartConfig = {
  critical: {
    label: 'Critical',
    color: 'hsl(0, 72%, 51%)',
  },
  high: {
    label: 'High',
    color: 'hsl(20, 80%, 55%)',
  },
  medium: {
    label: 'Medium',
    color: 'hsl(45, 93%, 58%)',
  },
  low: {
    label: 'Low',
    color: 'hsl(142, 71%, 45%)',
  },
} satisfies ChartConfig;

export function SecretsSeverityCard() {
  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <CardTitle>Secrets by severity</CardTitle>
        <CardAction>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="size-4 text-muted-foreground cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent>
              Breakdown of secrets categorized by severity level
            </TooltipContent>
          </Tooltip>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-1 items-end pb-2">
        <ChartContainer
          config={chartConfig}
          className="mx-auto w-full max-h-[160px] aspect-[2/1]"
        >
          <RadialBarChart
            data={chartData}
            endAngle={180}
            innerRadius={88}
            outerRadius={100}
            cy="80%"
          >
            <RadialBar
              dataKey="low"
              fill="var(--color-low)"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="medium"
              fill="var(--color-medium)"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="high"
              fill="var(--color-high)"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="critical"
              fill="var(--color-critical)"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {totalSecrets.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground"
                        >
                          Total secrets
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
          83% classified as Critical or High <TrendingUp className="size-4" />
        </div>
        <div className="text-xs leading-none text-muted-foreground">
          1,720 secrets require immediate attention
        </div>
      </div>
    </Card>
  );
}
