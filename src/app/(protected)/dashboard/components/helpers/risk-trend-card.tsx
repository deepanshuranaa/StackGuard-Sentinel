'use client';

import { useState } from 'react';
import { Info, TrendingUp } from 'lucide-react';
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Label,
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { getChartDataByPeriod } from '../../lib/dashboard-util';

const chartConfig = {
  risk: {
    label: 'Risk Score',
    color: 'hsl(270, 70%, 60%)',
  },
} satisfies ChartConfig;

export function RiskTrendCard() {
  const [period, setPeriod] = useState('30');
  const chartData = getChartDataByPeriod(period);

  return (
    <Card className="flex flex-col gap-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Risk trend over time</CardTitle>
        <div className="flex items-center gap-3">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[120px] h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5 Days</SelectItem>
              <SelectItem value="30">30 Days</SelectItem>
              <SelectItem value="180">6 Months</SelectItem>
              <SelectItem value="365">12 Months</SelectItem>
            </SelectContent>
          </Select>
          <CardAction className="mt-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="size-4 text-muted-foreground cursor-pointer" />
              </TooltipTrigger>
              <TooltipContent>
                Historical risk score trend over selected period
              </TooltipContent>
            </Tooltip>
          </CardAction>
        </div>
      </CardHeader>
      <CardContent className="h-[250px] pb-0 px-0 pr-4">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 35,
              right: 12,
              top: 12,
              bottom: 40,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            >
              <Label value="Date" position="bottom" offset={15} style={{ fontWeight: 600 }} />
            </XAxis>
            <YAxis
              domain={[0, 100]}
              label={{
                value: 'Risk score (%)',
                angle: -90,
                position: 'insideLeft',
                offset: -10,
                dy: 40,
                style: { fontWeight: 600 },
              }}
              tickFormatter={(value) => `${value}%`}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="risk"
              type="linear"
              stroke="var(--color-risk)"
              strokeWidth={2}
              dot={{
                fill: 'var(--color-risk)',
                r: 4,
              }}
              activeDot={{
                r: 6,
              }}
              isAnimationActive={true}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
