'use client';

import {
  Database,
  KeyRound,
  Users,
  AlertTriangle,
  UserCheck,
  UserX,
  type LucideIcon,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface SummaryItem {
  icon: LucideIcon;
  label: string;
  value: number;
}

const summaryItems: SummaryItem[] = [
  { icon: Database, label: 'Monitored tokens', value: 4657 },
  { icon: KeyRound, label: 'Total NHIs', value: 1560 },
  { icon: Users, label: 'Total users', value: 20 },
  { icon: AlertTriangle, label: 'Total secrets', value: 17 },
  { icon: AlertTriangle, label: 'Secrets exposed', value: 17 },
  { icon: UserCheck, label: 'Total active users', value: 20 },
  { icon: KeyRound, label: 'Total NHIs', value: 1560 },
  { icon: UserX, label: 'Ex employee access', value: 20 },
];

export function QuickSummaryCard() {
  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <CardTitle>Quick summary</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col px-0 pb-0">
        <div className="flex flex-1 flex-col">
          {summaryItems.map((item, index) => (
            <div key={`${item.label}-${index}`}>
              {index > 0 && <Separator />}
              <div className="flex items-center gap-3 px-6 py-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-muted">
                  <item.icon className="size-4 text-muted-foreground" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                  <p className="text-xl font-semibold leading-tight">{item.value.toLocaleString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
