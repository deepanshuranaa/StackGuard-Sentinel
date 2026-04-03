const SYNC_STORAGE_KEY = 'sg_last_sync';

export function formatTimeAgo(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes} min${minutes === 1 ? '' : 's'} ago`;
  if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  return `${days} day${days === 1 ? '' : 's'} ago`;
}

export function getSyncTimestamp(): number | null {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem(SYNC_STORAGE_KEY);
  if (!stored) return null;
  const parsed = Number(stored);
  return isNaN(parsed) ? null : parsed;
}

export function setSyncTimestamp(ts: number): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(SYNC_STORAGE_KEY, String(ts));
}
