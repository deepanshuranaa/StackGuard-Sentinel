'use client';

import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

type ExportButtonProps = {
  onExport: () => void;
};

export function ExportButton({ onExport }: ExportButtonProps) {
  return (
    <Button variant="outline" onClick={onExport} className="shrink-0 gap-2 cursor-pointer">
      <Download className="size-4" />
      <span className="hidden sm:inline">Export data</span>
    </Button>
  );
}
