'use client';

import { Download, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

type ExportButtonProps = {
  onExport: () => void;
  isExporting: boolean;
};

export function ExportButton({ onExport, isExporting }: ExportButtonProps) {
  return (
    <Button
      variant="outline"
      onClick={onExport}
      disabled={isExporting}
      className="shrink-0 gap-2 cursor-pointer"
    >
      {isExporting ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <Download className="size-4" />
      )}
      <span className="hidden sm:inline">
        {isExporting ? 'Exporting…' : 'Export data'}
      </span>
    </Button>
  );
}
