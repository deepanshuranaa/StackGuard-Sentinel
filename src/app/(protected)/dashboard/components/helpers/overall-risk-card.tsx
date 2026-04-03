'use client';

import { Info } from 'lucide-react';
import {
  Card,
  CardAction,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export function OverallRiskCard() {
  return (
    <Card className="h-full">
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
    </Card>
  );
}
