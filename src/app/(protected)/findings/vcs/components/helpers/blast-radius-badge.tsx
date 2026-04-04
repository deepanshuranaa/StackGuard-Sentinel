'use client';

import { cn } from '@/lib/utils/utils';

type BlastRadiusBadgeProps = {
  level: 'low' | 'medium' | 'high';
};

const blastStyles: Record<string, string> = {
  low: 'text-green-600 dark:text-green-400',
  medium: 'text-yellow-600 dark:text-yellow-400',
  high: 'text-red-600 dark:text-red-400',
};

export function BlastRadiusBadge({ level }: BlastRadiusBadgeProps) {
  return (
    <span className={cn('text-sm font-medium capitalize', blastStyles[level])}>
      {level}
    </span>
  );
}
