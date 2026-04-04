import {
  Shield,
  ShieldAlert,
  ShieldCheck,
  Layers,
  PenTool,
  Eye,
  AlertTriangle,
  Lock,
  ShieldOff,
} from 'lucide-react';
import type { BlastRadiusSummary, RiskSeverity } from '../../types/blast-radius';

const severityConfig: Record<
  RiskSeverity,
  { bg: string; text: string; ring: string; label: string }
> = {
  Critical: {
    bg: 'bg-red-100 dark:bg-red-900/30',
    text: 'text-red-700 dark:text-red-400',
    ring: 'ring-red-500/30',
    label: 'Critical Risk',
  },
  High: {
    bg: 'bg-orange-100 dark:bg-orange-900/30',
    text: 'text-orange-700 dark:text-orange-400',
    ring: 'ring-orange-500/30',
    label: 'High Risk',
  },
  Medium: {
    bg: 'bg-yellow-100 dark:bg-yellow-900/30',
    text: 'text-yellow-700 dark:text-yellow-400',
    ring: 'ring-yellow-500/30',
    label: 'Medium Risk',
  },
  Low: {
    bg: 'bg-green-100 dark:bg-green-900/30',
    text: 'text-green-700 dark:text-green-400',
    ring: 'ring-green-500/30',
    label: 'Low Risk',
  },
};

interface RiskSummaryCardProps {
  riskScore: number;
  severity: RiskSeverity;
  summary: BlastRadiusSummary;
}

export function RiskSummaryCard({ riskScore, severity, summary }: RiskSummaryCardProps) {
  const cfg = severityConfig[severity];
  const RiskIcon = severity === 'Critical' || severity === 'High' ? ShieldAlert
    : severity === 'Medium' ? Shield
    : ShieldCheck;

  const stats = [
    { icon: Layers, label: 'Services', value: summary.totalServices },
    { icon: Eye, label: 'Total Scopes', value: summary.totalScopes },
    { icon: PenTool, label: 'Write Access', value: summary.writeAccessCount },
    { icon: AlertTriangle, label: 'Critical Scopes', value: summary.criticalScopes },
    { icon: Lock, label: '2FA Enabled', value: summary.has2FA ? 'Yes' : 'No' },
    { icon: ShieldOff, label: 'Admin Access', value: summary.hasAdmin ? 'Yes' : 'No' },
  ];

  return (
    <div className="rounded-xl border bg-white dark:bg-slate-900 p-5 shadow-sm">
      {/* Score header */}
      <div className="flex items-center gap-4 mb-4">
        <div
          className={`flex h-16 w-16 items-center justify-center rounded-2xl ring-4 ${cfg.bg} ${cfg.ring}`}
        >
          <RiskIcon className={`h-8 w-8 ${cfg.text}`} />
        </div>
        <div>
          <div className="flex items-baseline gap-2">
            <span className={`text-3xl font-black ${cfg.text}`}>{riskScore}</span>
            <span className="text-sm text-muted-foreground">/ 100</span>
          </div>
          <span
            className={`inline-block mt-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${cfg.bg} ${cfg.text}`}
          >
            {cfg.label}
          </span>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-3 gap-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg border bg-slate-50 dark:bg-slate-800/50 px-3 py-2.5"
          >
            <div className="flex items-center gap-1.5 mb-1">
              <stat.icon className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                {stat.label}
              </span>
            </div>
            <span className="text-lg font-bold text-foreground">{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
