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

export interface RiskTrendDataPoint {
  date: string;
  risk: number;
}

export function getChartDataByPeriod(period: string): RiskTrendDataPoint[] {
  const generateData = (days: number): RiskTrendDataPoint[] => {
    const data: RiskTrendDataPoint[] = [];
    const now = new Date();
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const dateStr = `${month}/${day}`;
      // Generate realistic risk score data with some variation
      const baseRisk = 20 + Math.sin(i * 0.5) * 25 + Math.random() * 15;
      data.push({
        date: dateStr,
        risk: Math.min(100, Math.max(0, Math.round(baseRisk))),
      });
    }
    return data;
  };

  const generateMonthData = (months: number): RiskTrendDataPoint[] => {
    const data: RiskTrendDataPoint[] = [];
    const now = new Date();
    for (let i = months - 1; i >= 0; i--) {
      const date = new Date(now);
      date.setMonth(date.getMonth() - i);
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const dateStr = `${month}/${day}`;
      const baseRisk = 25 + Math.sin(i * 0.3) * 28 + Math.random() * 12;
      data.push({
        date: dateStr,
        risk: Math.min(100, Math.max(0, Math.round(baseRisk))),
      });
    }
    return data;
  };

  switch (period) {
    case '5':
      return generateData(5);
    case '30':
      return generateData(30);
    case '180':
      return generateMonthData(26); // ~6 months of weekly data
    case '365':
      return generateMonthData(52); // ~12 months of weekly data
    default:
      return generateData(30);
  }
}
