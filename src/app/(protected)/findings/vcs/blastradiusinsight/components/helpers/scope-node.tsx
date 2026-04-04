'use client';

import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import type { ScopeNodeData } from '../../types/blast-radius';

const accessColors: Record<string, string> = {
  Admin: 'bg-red-100 text-red-700 border-red-300 dark:bg-red-900/30 dark:text-red-400 dark:border-red-700',
  Write: 'bg-red-50 text-red-600 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800',
  'Read & Write': 'bg-orange-50 text-orange-600 border-orange-200 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-800',
  Read: 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800',
};

const accessDot: Record<string, string> = {
  Admin: 'bg-red-500',
  Write: 'bg-red-400',
  'Read & Write': 'bg-orange-400',
  Read: 'bg-yellow-500',
};

function ScopeNodeComponent({ data }: NodeProps) {
  const d = data as ScopeNodeData;
  const color = accessColors[d.access] ?? accessColors.Read;
  const dot = accessDot[d.access] ?? accessDot.Read;

  return (
    <div className="relative">
      <Handle type="target" position={Position.Top} className="!bg-slate-400 !w-2 !h-2" />
      <div
        className={`
          min-w-[110px] max-w-[170px] rounded-lg border px-2.5 py-1.5
          shadow-sm ${color}
        `}
      >
        <div className="flex items-center gap-1.5">
          <span className={`h-2 w-2 rounded-full shrink-0 ${dot}`} />
          <span className="text-[11px] font-semibold truncate">{d.label}</span>
        </div>
        {d.permissionCount > 1 && (
          <p className="text-[9px] opacity-70 mt-0.5 pl-3.5">
            {d.permissionCount} sub-scopes
          </p>
        )}
      </div>
    </div>
  );
}

export const ScopeNode = memo(ScopeNodeComponent);
