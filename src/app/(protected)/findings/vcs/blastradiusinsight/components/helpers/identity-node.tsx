'use client';

import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { KeyRound } from 'lucide-react';
import type { IdentityNodeData } from '../../types/blast-radius';

const severityRing: Record<string, string> = {
  Critical: 'ring-red-500/40',
  High: 'ring-orange-500/40',
  Medium: 'ring-yellow-500/40',
  Low: 'ring-green-500/40',
};

const severityBg: Record<string, string> = {
  Critical: 'bg-red-600',
  High: 'bg-orange-600',
  Medium: 'bg-yellow-600',
  Low: 'bg-green-600',
};

function IdentityNodeComponent({ data }: NodeProps) {
  const d = data as IdentityNodeData;

  return (
    <div className="relative">
      <div
        className={`
          flex flex-col items-center gap-2 rounded-2xl border-2 border-slate-700
          bg-slate-900 px-6 py-4 shadow-2xl ring-4 ${severityRing[d.severity]}
        `}
      >
        <div className={`rounded-full p-2.5 ${severityBg[d.severity]}`}>
          <KeyRound className="h-6 w-6 text-white" />
        </div>
        <span className="text-sm font-bold text-white">{d.label}</span>
        <span className="text-[10px] text-slate-400">{d.keyType}</span>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-black text-white">{d.riskScore}</span>
          <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold text-white uppercase tracking-wider">
            {d.severity} Risk
          </span>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-slate-500 !w-3 !h-3" />
    </div>
  );
}

export const IdentityNode = memo(IdentityNodeComponent);
