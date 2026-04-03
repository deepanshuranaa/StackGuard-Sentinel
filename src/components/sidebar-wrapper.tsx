'use client';

import { ReactNode } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/sidebar/app-sidebar';
import { SiteHeader } from '@/components/site-header';

interface SidebarWrapperProps {
  children: ReactNode;
}

/**
 * SidebarWrapper - Orchestrates the layout with sidebar, header, and content
 * This component wraps the entire protected app layout and provides
 * the sidebar and header to all protected routes
 */
export function SidebarWrapper({ children }: SidebarWrapperProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-1 flex-col">
        <SiteHeader />
        <main className="flex-1 overflow-auto">
          <div className="p-6">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
