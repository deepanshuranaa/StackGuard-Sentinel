'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks/use-auth';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-neutral-300 border-t-blue-600 rounded-full animate-spin" />
          <p className="mt-4 text-neutral-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="flex h-screen">
        {/* Sidebar placeholder */}
        <aside className="w-64 bg-white border-r border-neutral-200">
          <nav className="p-4">
            <div className="text-sm font-semibold text-neutral-700">Menu</div>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-auto">
          {/* Header placeholder */}
          <header className="bg-white border-b border-neutral-200 px-8 py-4">
            <div className="text-sm text-neutral-600">Header</div>
          </header>

          {/* Page content */}
          <div className="p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
