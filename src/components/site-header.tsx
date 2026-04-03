'use client';

import { usePathname } from 'next/navigation';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';

// Map routes to page titles
const routeTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/findings/vcs': 'VCS',
  '/findings/cloud-iam': 'Cloud IAM',
  '/findings/cloud-storage': 'Cloud Storage',
  '/findings/directory': 'Directory Services',
  '/manage-scans': 'Manage Scans',
  '/reports': 'Reports',
  '/integrations': 'Integrations',
  '/settings': 'Settings',
};

export function SiteHeader() {
  const pathname = usePathname();
  const title = routeTitles[pathname] || 'StackGuard Sentinel';

  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mx-2 h-4" />
      <div className="flex flex-1 items-center justify-between">
        <h1 className="text-sm font-semibold">{title}</h1>
      </div>
    </header>
  );
}
