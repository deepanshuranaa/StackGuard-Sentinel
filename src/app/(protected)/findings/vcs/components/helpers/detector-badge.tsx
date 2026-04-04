'use client';

import { DETECTOR_META } from '../../lib/vcs-data-util';

type DetectorBadgeProps = {
  detectorType: string;
};

export function DetectorBadge({ detectorType }: DetectorBadgeProps) {
  const meta = DETECTOR_META[detectorType];
  const label = meta?.label ?? detectorType;

  return (
    <span className="text-sm text-foreground truncate max-w-[140px]">
      {label}
    </span>
  );
}
