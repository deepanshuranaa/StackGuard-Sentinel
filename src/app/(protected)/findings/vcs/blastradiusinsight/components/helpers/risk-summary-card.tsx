import {
  Shield,
  ShieldAlert,
  ShieldCheck,
  Eye,
  PenTool,
  AlertTriangle,
  Lock,
  ShieldOff,
  KeyRound,
} from 'lucide-react';
import type { IdentityBlastRadius, RiskSeverity } from '../../types/blast-radius';

const severityConfig: Record<
  RiskSeverity,
  { bg: string; text: string; ring: string; label: string }
> = {
  Critical: {
    bg: 'bg-red-100 dark:bg-red-900/30',
    text: 'text-red-700 dark:text-red-400',
    ring: 'ring-red-500/30',
    label: 'Critical',
  },
  High: {
    bg: 'bg-orange-100 dark:bg-orange-900/30',
    text: 'text-orange-700 dark:text-orange-400',
    ring: 'ring-orange-500/30',
    label: 'High',
  },
  Medium: {
    bg: 'bg-yellow-100 dark:bg-yellow-900/30',
    text: 'text-yellow-700 dark:text-yellow-400',
    ring: 'ring-yellow-500/30',
    label: 'Medium',
  },
  Low: {
    bg: 'bg-green-100 dark:bg-green-900/30',
    text: 'text-green-700 dark:text-green-400',
    ring: 'ring-green-500/30',
    label: 'Low',
  },
};

interface RiskSummaryCardProps {
  identities: IdentityBlastRadius[];
}

export function RiskSummaryCard({ identities }: RiskSummaryCardProps) {
  return (
    <div className="space-y-4">
      {identities.map((identity) => {
        const cfg = severityConfig[identity.severity];
        const s = identity.summary;
        const RiskIcon = identity.severity === 'Critical' || identity.severity === 'High' ? ShieldAlert
          : identity.severity === 'Medium' ? Shield
          : ShieldCheck;

        const stats = [
          { icon: Eye, label: 'Scopes', value: s.totalScopes },
          { icon: PenTool, label: 'Write', value: s.writeAccessCount },
          { icon: AlertTriangle, label: 'R&W', value: s.readWriteAccessCount },
          { icon: AlertTriangle, label: 'Critical', value: s.criticalScopes },
          { icon: Lock, label: '2FA', value: s.has2FA ? 'Yes' : 'No' },
          { icon: ShieldOff, label: 'Restricted', value: s.isRestricted ? 'Yes' : 'No' },
        ];

        return (
          <div key={identity.id} className="rounded-xl border bg-white dark:bg-slate-900 p-4 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ring-2 ${cfg.bg} ${cfg.ring}`}>
                <RiskIcon className={`h-5 w-5 ${cfg.text}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <KeyRound className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-sm font-bold text-foreground">{identity.service}</span>
                  <span className="text-[10px] text-muted-foreground">{s.keyType}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-2xl font-black ${cfg.text}`}>{identity.riskScore}</span>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${cfg.bg} ${cfg.text}`}>
                  {cfg.label}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-6 gap-2">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-lg border bg-slate-50 dark:bg-slate-800/50 px-2 py-1.5 text-center"
                >
                  <div className="flex items-center justify-center gap-1 mb-0.5">
                    <stat.icon className="h-3 w-3 text-muted-foreground" />
                    <span className="text-[9px] text-muted-foreground uppercase tracking-wider">
                      {stat.label}
                    </span>
                  </div>
                  <span className="text-sm font-bold text-foreground">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
