'use client';

import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

type SyncButtonProps = {
  isSyncing: boolean;
  onSync: () => void;
};

export function SyncButton({ isSyncing, onSync }: SyncButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={onSync}
          disabled={isSyncing}
          className="shrink-0"
        >
          <RefreshCw
            className={`size-4 ${isSyncing ? 'animate-spin' : ''}`}
          />
          <span className="sr-only">Sync data</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>Sync data</TooltipContent>
    </Tooltip>
  );
}
