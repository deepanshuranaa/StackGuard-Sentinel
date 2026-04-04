export function GraphLegend() {
  const items = [
    { color: 'bg-red-500', label: 'Write / Admin access' },
    { color: 'bg-orange-400', label: 'Read & Write access' },
    { color: 'bg-yellow-500', label: 'Read-only access' },
  ];

  const nodeItems = [
    { shape: 'rounded-full bg-slate-900 border-2 border-slate-600', label: 'Identity (API Key)' },
    { shape: 'rounded-lg bg-white dark:bg-slate-800 border-2 border-slate-300', label: 'Service' },
    { shape: 'rounded bg-orange-50 dark:bg-orange-900/20 border border-orange-300', label: 'Scope' },
  ];

  return (
    <div className="rounded-xl border bg-white dark:bg-slate-900 p-4 shadow-sm">
      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
        Legend
      </h4>
      <div className="space-y-3">
        <div>
          <p className="text-[10px] font-medium text-muted-foreground mb-1.5">Edge Colors</p>
          <div className="space-y-1.5">
            {items.map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <span className={`h-0.5 w-6 rounded ${item.color}`} />
                <span className="text-[11px] text-foreground">{item.label}</span>
              </div>
            ))}
            <div className="flex items-center gap-2">
              <span className="h-0.5 w-6 rounded bg-red-500 animate-pulse" />
              <span className="text-[11px] text-foreground">Animated = active risk</span>
            </div>
          </div>
        </div>
        <div>
          <p className="text-[10px] font-medium text-muted-foreground mb-1.5">Nodes</p>
          <div className="space-y-1.5">
            {nodeItems.map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <span className={`h-3 w-5 ${item.shape}`} />
                <span className="text-[11px] text-foreground">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
