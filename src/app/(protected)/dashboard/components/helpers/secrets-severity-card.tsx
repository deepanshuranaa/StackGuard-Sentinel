'use client';

import { Info, TrendingUp } from 'lucide-react';
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const severityData = [
  { label: 'Critical', value: 1200, color: 'hsl(0, 72%, 51%)' },
  { label: 'High', value: 520, color: 'hsl(20, 80%, 55%)' },
  { label: 'Medium', value: 240, color: 'hsl(45, 93%, 58%)' },
  { label: 'Low', value: 100, color: 'hsl(142, 71%, 45%)' },
];

const totalSecrets = severityData.reduce((sum, s) => sum + s.value, 0);

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const angleRad = (angleDeg * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(angleRad),
    y: cy - r * Math.sin(angleRad),
  };
}

function describeArc(
  cx: number,
  cy: number,
  outerR: number,
  innerR: number,
  startAngle: number,
  endAngle: number
) {
  const outerStart = polarToCartesian(cx, cy, outerR, startAngle);
  const outerEnd = polarToCartesian(cx, cy, outerR, endAngle);
  const innerStart = polarToCartesian(cx, cy, innerR, endAngle);
  const innerEnd = polarToCartesian(cx, cy, innerR, startAngle);
  const sweep = startAngle - endAngle;
  const largeArc = sweep > 180 ? 1 : 0;

  return [
    `M ${outerStart.x} ${outerStart.y}`,
    `A ${outerR} ${outerR} 0 ${largeArc} 1 ${outerEnd.x} ${outerEnd.y}`,
    `L ${innerStart.x} ${innerStart.y}`,
    `A ${innerR} ${innerR} 0 ${largeArc} 0 ${innerEnd.x} ${innerEnd.y}`,
    'Z',
  ].join(' ');
}

export function SecretsSeverityCard() {
  const cx = 150;
  const cy = 140;
  const outerR = 100;
  const innerR = 88;

  // Build arc segments from left (180°) to right (0°)
  let currentAngle = 180;
  const arcs = severityData.map((segment) => {
    const angleSweep = (segment.value / totalSecrets) * 180;
    const startAngle = currentAngle;
    const endAngle = currentAngle - angleSweep;
    currentAngle = endAngle;
    return { ...segment, startAngle, endAngle };
  });

  // Background track (full semi-circle)
  const backgroundPath = describeArc(cx, cy, outerR, innerR, 180, 0);

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
        <svg viewBox="0 0 300 160" className="mx-auto w-full max-h-[160px]">
          {/* Background track */}
          <path d={backgroundPath} fill="hsl(0, 0%, 92%)" />
          {/* Severity segments */}
          {arcs.map((arc) => (
            <path
              key={arc.label}
              d={describeArc(cx, cy, outerR, innerR, arc.startAngle, arc.endAngle)}
              fill={arc.color}
            />
          ))}
          {/* Center text */}
          <text x={cx} y={cy - 24} textAnchor="middle" className="fill-foreground text-3xl font-bold">
            {totalSecrets.toLocaleString()}
          </text>
          <text x={cx} y={cy - 2} textAnchor="middle" className="fill-muted-foreground text-xs">
            Total secrets
          </text>
        </svg>
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
