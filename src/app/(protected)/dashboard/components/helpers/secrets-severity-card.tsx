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

export function SecretsSeverityCard() {
  return (
    <Card className="h-full">
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
    </Card>
  );
}
