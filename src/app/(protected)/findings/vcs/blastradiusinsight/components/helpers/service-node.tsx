'use client';

import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { Shield, ShieldAlert, ShieldCheck } from 'lucide-react';
import type { ServiceNodeData } from '../../types/blast-radius';

const riskBorder: Record<string, string> = {
  Critical: 'border-red-500',
  High: 'border-orange-500',
  Medium: 'border-yellow-500',
  Low: 'border-green-500',
};

const riskBadge: Record<string, string> = {
  Critical: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  High: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  Medium: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  Low: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
};

function ServiceNodeComponent({ data }: NodeProps) {
  const d = data as ServiceNodeData;

  const RiskIcon = d.risk === 'Critical' || d.risk === 'High' ? ShieldAlert
    : d.risk === 'Medium' ? Shield
    : ShieldCheck;

  return (
    <div className="relative">
      <Handle type="target" position={Position.Top} className="!bg-slate-400 !w-2.5 !h-2.5" />
      <div
        className={`
          min-w-[180px] rounded-xl border-2 bg-white dark:bg-slate-900
          px-4 py-3 shadow-lg ${riskBorder[d.risk]}
        `}
      >
        <div className="flex items-center gap-2 mb-2">
          <RiskIcon className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm font-bold text-foreground">{d.label}</span>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Key Type</span>
            <span className="text-[10px] font-medium text-foreground truncate max-w-[100px]">{d.keyType}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Scopes</span>
            <span className="text-[10px] font-bold text-foreground">{d.scopeCount}</span>
          </div>
          <div className="flex items-center justify-between gap-2">
            {d.has2FA && (
              <span className="rounded-full bg-green-100 px-1.5 py-0.5 text-[9px] font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                2FA
              </span>
            )}
            {d.isRestricted && (
              <span className="rounded-full bg-blue-100 px-1.5 py-0.5 text-[9px] font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                Restricted
              </span>
            )}
            <span className={`ml-auto rounded-full px-1.5 py-0.5 text-[9px] font-semibold ${riskBadge[d.risk]}`}>
              {d.risk}
            </span>
          </div>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-slate-400 !w-2.5 !h-2.5" />
    </div>
  );
}

export const ServiceNode = memo(ServiceNodeComponent);
