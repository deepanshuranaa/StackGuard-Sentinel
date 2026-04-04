import { ChevronRight } from 'lucide-react';
import type { AttackPath, RiskSeverity } from '../../types/blast-radius';

const riskBadge: Record<RiskSeverity, string> = {
  Critical: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  High: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  Medium: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  Low: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
};

const riskDot: Record<RiskSeverity, string> = {
  Critical: 'bg-red-500',
  High: 'bg-orange-500',
  Medium: 'bg-yellow-500',
  Low: 'bg-green-500',
};

interface AttackPathsCardProps {
  attackPaths: AttackPath[];
}

export function AttackPathsCard({ attackPaths }: AttackPathsCardProps) {
  if (attackPaths.length === 0) return null;

  return (
    <div className="rounded-xl border bg-white dark:bg-slate-900 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-foreground">Attack Paths</h3>
        <span className="text-xs text-muted-foreground">
          {attackPaths.length} path{attackPaths.length > 1 ? 's' : ''} identified
        </span>
      </div>

      <div className="space-y-2 max-h-[280px] overflow-y-auto pr-1">
        {attackPaths.map((path, idx) => (
          <div
            key={idx}
            className="flex items-center gap-1 rounded-lg border bg-slate-50 dark:bg-slate-800/50 px-3 py-2"
          >
            <span className={`h-2 w-2 rounded-full shrink-0 ${riskDot[path.risk]}`} />

            <div className="flex items-center gap-0.5 flex-wrap ml-1">
              {path.steps.map((step, stepIdx) => (
                <span key={stepIdx} className="flex items-center gap-0.5">
                  <span className="text-[11px] font-medium text-foreground whitespace-nowrap">
                    {step}
                  </span>
                  {stepIdx < path.steps.length - 1 && (
                    <ChevronRight className="h-3 w-3 text-muted-foreground shrink-0" />
                  )}
                </span>
              ))}
            </div>

            <span
              className={`ml-auto shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-semibold ${riskBadge[path.risk]}`}
            >
              {path.accessLevel}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
