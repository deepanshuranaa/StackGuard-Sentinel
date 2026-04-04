import type { Metadata } from 'next';
import { AuthProvider } from '@/context/auth-context';
import { ToasterProvider } from '@/components/providers/toaster-provider';
import { TooltipProvider } from '@/components/ui/tooltip';
import './globals.css';
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: 'StackGuard Sentinel',
  description: 'Security intelligence dashboard for Non-Human Identities',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body>
        <AuthProvider>
          <TooltipProvider>
            <ToasterProvider />
            {children}
          </TooltipProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
