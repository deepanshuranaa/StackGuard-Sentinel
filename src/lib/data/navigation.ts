import {
  LayoutDashboard,
  FileStack,
  Settings,
  Zap,
  FileText,
  Plug,
  LogOut,
  LucideIcon,
} from 'lucide-react';

export interface NavItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: NavItem[];
}

export interface SidebarData {
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
  navMain: NavItem[];
  navSecondary: NavItem[];
}

export const sidebarData: SidebarData = {
  user: {
    name: 'Admin User',
    email: 'admin@stackguard.io',
  },
  navMain: [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: LayoutDashboard,
    },
    {
      title: 'Findings',
      url: '#',
      icon: FileStack,
      items: [
        {
          title: 'VCS',
          url: '/findings/vcs',
        },
        {
          title: 'Cloud IAM',
          url: '/findings/cloud-iam',
        },
        {
          title: 'Cloud storage',
          url: '/findings/cloud-storage',
        },
        {
          title: 'Directory services',
          url: '/findings/directory',
        },
      ],
    },
    {
      title: 'Manage scans',
      url: '/manage-scans',
      icon: Zap,
    },
    {
      title: 'Reports',
      url: '/reports',
      icon: FileText,
    },
  ],
  navSecondary: [
    {
      title: 'Integrations',
      url: '/integrations',
      icon: Plug,
    },
    {
      title: 'Settings',
      url: '/settings',
      icon: Settings,
    },
  ],
};
