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

export function RiskTrendCard() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Risk trend over time</CardTitle>
        <CardAction>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="size-4 text-muted-foreground cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent>
              Historical risk score trend over selected period
            </TooltipContent>
          </Tooltip>
        </CardAction>
      </CardHeader>
    </Card>
  );
}
