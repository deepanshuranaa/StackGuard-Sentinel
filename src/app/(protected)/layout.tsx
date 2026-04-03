'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks/use-auth';
import { SidebarWrapper } from '@/components/sidebar-wrapper';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();
  const [showSessionExpired, setShowSessionExpired] = useState(false);

  useEffect(() => {
    // Check credentials in the background after initial render
    if (!isLoading && !isAuthenticated) {
      setShowSessionExpired(true);
    }
  }, [isAuthenticated, isLoading]);

  const handleRedirectToLogin = () => {
    router.push('/login');
  };

  // Render content with overlay dialog if session expired
  return (
    <>
      <SidebarWrapper>{children}</SidebarWrapper>
      {showSessionExpired && (
        <Dialog open={true} onOpenChange={() => {}}>
          <DialogContent className="sm:max-w-sm" onPointerDownOutside={(e) => e.preventDefault()}>
            <DialogHeader>
              <DialogTitle>Session Expired</DialogTitle>
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-red-100 mt-4">
                <LogOut className="w-6 h-6 text-red-600" />
              </div>
              <DialogDescription>
                <b>Your session has ended for security purposes.</b> Please log in again to continue using StackGuard Sentinel and keep your identity intelligence protected.
              </DialogDescription>
            </DialogHeader>
            <div className="flex gap-3 justify-center pt-4">
              <Button
                onClick={handleRedirectToLogin}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white cursor-pointer"
              >
                Redirect to Login
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
