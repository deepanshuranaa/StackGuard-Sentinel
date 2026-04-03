'use client';

import { usePathname } from 'next/navigation';
import type { NavItem } from '@/lib/data/navigation';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

interface NavSecondaryProps {
  items: NavItem[];
  className?: string;
}

export function NavSecondary({ items, className }: NavSecondaryProps) {
  const pathname = usePathname();

  return (
    <SidebarMenu className={className}>
      {items.map((item) => {
        const isActive = pathname === item.url;

        return (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              asChild
              tooltip={item.title}
              isActive={isActive}
            >
              <a href={item.url} className="flex items-center">
                {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                <span>{item.title}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}
