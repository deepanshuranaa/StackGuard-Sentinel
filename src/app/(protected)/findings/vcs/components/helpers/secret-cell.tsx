'use client';

import { useState, useCallback, useRef } from 'react';
import { Copy, CheckCheck, Eye, EyeOff } from 'lucide-react';

type SecretCellProps = {
  secret: string;
};

export function SecretCell({ secret }: SecretCellProps) {
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(secret).then(() => {
      setCopied(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), 5000);
    });
  }, [secret]);

  return (
    <span className="inline-flex items-center gap-2">
      <span className="font-mono text-xs text-muted-foreground tracking-wider">
        {visible ? secret : '••••••••••'}
      </span>
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        className="cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
        aria-label={visible ? 'Hide secret' : 'Show secret'}
      >
        {visible ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
      </button>
      <button
        type="button"
        onClick={handleCopy}
        className="cursor-pointer transition-colors"
        aria-label="Copy secret"
        disabled={copied}
      >
        {copied ? (
          <CheckCheck className="h-3.5 w-3.5 text-green-500" />
        ) : (
          <Copy className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground" />
        )}
      </button>
    </span>
  );
}
