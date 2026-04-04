'use client';

import { cn } from '@/lib/utils/utils';
import { STATUS_META } from '../../lib/vcs-data-util';

type StatusBadgesProps = {
  actions: string[];
};

export function StatusBadges({ actions }: StatusBadgesProps) {
  if (!actions || actions.length === 0) {
    return <span className="text-xs text-muted-foreground">—</span>;
  }

  return (
    <div className="flex flex-wrap gap-1">
      {actions.map((action) => {
        const meta = STATUS_META[action];
        if (!meta) return null;
        return (
          <span
            key={action}
            className={cn(
              'inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium',
              meta.color
            )}
          >
            {meta.label}
          </span>
        );
      })}
    </div>
  );
}
