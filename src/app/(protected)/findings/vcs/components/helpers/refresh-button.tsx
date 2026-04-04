'use client';

import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

type RefreshButtonProps = {
  isLoading: boolean;
  onRefresh: () => void;
};

export function RefreshButton({ isLoading, onRefresh }: RefreshButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={onRefresh}
          disabled={isLoading}
          className="shrink-0 cursor-pointer"
        >
          <RefreshCw className={`size-4 ${isLoading ? 'animate-spin' : ''}`} />
          <span className="sr-only">Refresh findings</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>Refresh findings</TooltipContent>
    </Tooltip>
  );
}
