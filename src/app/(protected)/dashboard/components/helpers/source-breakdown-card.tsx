'use client';

import { MessageCircle } from 'lucide-react';
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import type { SelectedSourceDetails, SourceBreakdown } from '../../types/insights';

interface SourceBreakdownCardProps {
  data: SelectedSourceDetails;
  sourceName: string;
  onViewMore?: () => void;
}

const sourceIcons: Record<string, string> = {
  'Slack': '💬',
  'Github': '🐙',
  'Gitlab': '🦊',
  'Bitbucket': '🪣',
  'Azure DevOps': '☁️',
  'S3': '🪣',
  'GCS': '☁️',
  'AWS': '☁️',
  'GCP': '☁️',
  'Azure': '☁️',
  'Okta': '🔐',
  'Azure AD': '🔐',
};

export function SourceBreakdownCard({
  data,
  sourceName,
  onViewMore,
}: SourceBreakdownCardProps) {
  const icon = sourceIcons[sourceName] || '📦';

  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="text-xl">{icon}</div>
          <CardTitle className="text-base">{sourceName}</CardTitle>
        </div>
        <CardAction>
          <button
            onClick={onViewMore}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            View more
          </button>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col px-0 pb-0">
        <div className="flex flex-col">
          {/* Selected value */}
          <div className="flex justify-between px-6 py-3">
            <span className="text-sm text-muted-foreground">Selected value</span>
            <span className="font-semibold">{data.selectedValue}</span>
          </div>
          <Separator />

          {/* Total */}
          <div className="flex justify-between px-6 py-3">
            <span className="text-sm text-muted-foreground">Total</span>
            <span className="font-semibold">{data.total}</span>
          </div>
          <Separator />

          {/* Critical */}
          <div className="flex justify-between px-6 py-3">
            <span className="text-sm text-muted-foreground">Critical</span>
            <span className="font-semibold">{data.critical}</span>
          </div>
          <Separator />

          {/* Risky */}
          <div className="flex justify-between px-6 py-3">
            <span className="text-sm text-muted-foreground">Risky</span>
            <span className="font-semibold">{data.risky}</span>
          </div>
          <Separator />

          {/* Source breakdown header */}
          <div className="px-6 py-3 pt-4">
            <span className="text-sm font-medium">Source breakdown</span>
          </div>
          <Separator />

          {/* Breakdown items */}
          {data.breakdown.map((item: SourceBreakdown, idx: number) => (
            <div key={`${item.name}-${idx}`}>
              <div className="flex justify-between px-6 py-3">
                <span className="text-sm text-muted-foreground">{item.name}</span>
                <span className="font-semibold">{item.count}</span>
              </div>
              {idx < data.breakdown.length - 1 && <Separator />}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
