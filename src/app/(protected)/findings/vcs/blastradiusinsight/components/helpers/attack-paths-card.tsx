import { ChevronRight, KeyRound } from 'lucide-react';
import type { AccessLevel, IdentityBlastRadius, RiskSeverity } from '../../types/blast-radius';

const accessBadge: Record<AccessLevel, string> = {
  Admin: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  Write: 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400',
  'Read & Write': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  Read: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
};

const riskDot: Record<RiskSeverity, string> = {
  Critical: 'bg-red-500',
  High: 'bg-orange-500',
  Medium: 'bg-yellow-500',
  Low: 'bg-green-500',
};

interface AttackPathsCardProps {
  identities: IdentityBlastRadius[];
}

export function AttackPathsCard({ identities }: AttackPathsCardProps) {
  const withPaths = identities.filter((i) => i.attackPaths.length > 0);
  if (withPaths.length === 0) return null;

  return (
    <div className="space-y-4">
      {withPaths.map((identity) => (
        <div key={identity.id} className="rounded-xl border bg-white dark:bg-slate-900 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <KeyRound className="h-3.5 w-3.5 text-muted-foreground" />
              <h3 className="text-sm font-semibold text-foreground">{identity.service} Attack Paths</h3>
            </div>
            <span className="text-xs text-muted-foreground">
              {identity.attackPaths.length} path{identity.attackPaths.length > 1 ? 's' : ''}
            </span>
          </div>

          <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1">
            {identity.attackPaths.map((path, idx) => (
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
                  className={`ml-auto shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-semibold ${accessBadge[path.accessLevel]}`}
                >
                  {path.accessLevel}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
