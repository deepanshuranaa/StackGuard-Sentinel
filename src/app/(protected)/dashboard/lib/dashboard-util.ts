const SYNC_STORAGE_KEY = 'sg_last_sync';

// --- Seeded PRNG (mulberry32) for hydration-safe deterministic data ---
const REFERENCE_DATE = new Date('2026-04-04T00:00:00Z');

function createSeededRandom(seed: number): () => number {
  let s = seed | 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0;
  }
  return hash;
}
// --- End seeded PRNG ---

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
  const seededRandom = createSeededRandom(42 + hashString(`chart-${period}`));

  const generateData = (days: number): RiskTrendDataPoint[] => {
    const data: RiskTrendDataPoint[] = [];
    const ref = new Date(REFERENCE_DATE);
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(ref);
      date.setDate(date.getDate() - i);
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const dateStr = `${month}/${day}`;
      const baseRisk = 20 + Math.sin(i * 0.5) * 25 + seededRandom() * 15;
      data.push({
        date: dateStr,
        risk: Math.min(100, Math.max(0, Math.round(baseRisk))),
      });
    }
    return data;
  };

  const generateMonthData = (months: number): RiskTrendDataPoint[] => {
    const data: RiskTrendDataPoint[] = [];
    const ref = new Date(REFERENCE_DATE);
    for (let i = months - 1; i >= 0; i--) {
      const date = new Date(ref);
      date.setMonth(date.getMonth() - i);
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const dateStr = `${month}/${day}`;
      const baseRisk = 25 + Math.sin(i * 0.3) * 28 + seededRandom() * 12;
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
      return generateMonthData(26);
    case '365':
      return generateMonthData(52);
    default:
      return generateData(30);
  }
}

import type { InsightsTabData, InsightsTab, SourceMetric, SourceBreakdown } from '../types/insights';

const sourceNames: Record<InsightsTab, string[]> = {
  'vcs': ['Slack', 'GitHub', 'PostgreSQL', 'Anthropic', 'GitLab', 'OpenAI', 'HashiCorp Vault', 'Microsoft Azure', 'Hugging Face', 'Gradio'],
  'storage': ['Slack', 'GitHub', 'PostgreSQL', 'Anthropic', 'GitLab', 'OpenAI', 'HashiCorp Vault', 'Microsoft Azure', 'Hugging Face', 'Gradio'],
  'cloud-infra': ['Slack', 'GitHub', 'PostgreSQL', 'Anthropic', 'GitLab', 'OpenAI', 'HashiCorp Vault', 'Microsoft Azure', 'Hugging Face', 'Gradio'],
  'directory-services': ['Slack', 'GitHub', 'PostgreSQL', 'Anthropic', 'GitLab', 'OpenAI', 'HashiCorp Vault', 'Microsoft Azure', 'Hugging Face', 'Gradio'],
};

const breakdownSources: Record<InsightsTab, Record<string, string[]>> = {
  'vcs': {
    'Slack': ['Channels', 'Direct Messages'],
    'GitHub': ['Repos', 'Gists'],
    'PostgreSQL': ['Schemas', 'Tables'],
    'Anthropic': ['API Keys', 'Models'],
    'GitLab': ['Repositories', 'Pipelines'],
    'OpenAI': ['Keys', 'Organizations'],
    'HashiCorp Vault': ['Secrets', 'Policies'],
    'Microsoft Azure': ['Key Vault', 'Managed Identities'],
    'Hugging Face': ['Tokens', 'Models'],
    'Gradio': ['Endpoints', 'Interfaces'],
  },
  'storage': {
    'Slack': ['Channels', 'Direct Messages'],
    'GitHub': ['Repos', 'Gists'],
    'PostgreSQL': ['Schemas', 'Tables'],
    'Anthropic': ['API Keys', 'Models'],
    'GitLab': ['Repositories', 'Pipelines'],
    'OpenAI': ['Keys', 'Organizations'],
    'HashiCorp Vault': ['Secrets', 'Policies'],
    'Microsoft Azure': ['Key Vault', 'Managed Identities'],
    'Hugging Face': ['Tokens', 'Models'],
    'Gradio': ['Endpoints', 'Interfaces'],
  },
  'cloud-infra': {
    'Slack': ['Channels', 'Direct Messages'],
    'GitHub': ['Repos', 'Gists'],
    'PostgreSQL': ['Schemas', 'Tables'],
    'Anthropic': ['API Keys', 'Models'],
    'GitLab': ['Repositories', 'Pipelines'],
    'OpenAI': ['Keys', 'Organizations'],
    'HashiCorp Vault': ['Secrets', 'Policies'],
    'Microsoft Azure': ['Key Vault', 'Managed Identities'],
    'Hugging Face': ['Tokens', 'Models'],
    'Gradio': ['Endpoints', 'Interfaces'],
  },
  'directory-services': {
    'Slack': ['Channels', 'Direct Messages'],
    'GitHub': ['Repos', 'Gists'],
    'PostgreSQL': ['Schemas', 'Tables'],
    'Anthropic': ['API Keys', 'Models'],
    'GitLab': ['Repositories', 'Pipelines'],
    'OpenAI': ['Keys', 'Organizations'],
    'HashiCorp Vault': ['Secrets', 'Policies'],
    'Microsoft Azure': ['Key Vault', 'Managed Identities'],
    'Hugging Face': ['Tokens', 'Models'],
    'Gradio': ['Endpoints', 'Interfaces'],
  },
};

export function getInsightsDataByTab(tab: InsightsTab): InsightsTabData {
  const seededRandom = createSeededRandom(42 + hashString(`insights-${tab}`));
  const sources = sourceNames[tab];
  const selectedSource = sources[0]; // Default to first source

  // Generate top 10 sources with varying critical/risky counts
  const metrics: SourceMetric[] = sources.slice(0, 10).map((source, idx) => {
    const baseTotal = Math.floor(seededRandom() * 8) + 2;
    const critical = Math.floor(baseTotal * (0.6 + seededRandom() * 0.3));
    const risky = Math.max(0, baseTotal - critical - Math.floor(seededRandom() * 2));
    return {
      name: source,
      critical,
      risky,
      total: baseTotal,
    };
  });

  // Generate source breakdown for selected source
  const breakdownNames = breakdownSources[tab][selectedSource] || ['Sub1', 'Sub2'];
  const breakdown: SourceBreakdown[] = breakdownNames.map((name) => ({
    name,
    count: Math.floor(seededRandom() * 5) + 1,
  }));

  const selectedMetric = metrics[0];
  const selectedSourceDetails = {
    selectedValue: selectedMetric.total,
    total: selectedMetric.total,
    critical: selectedMetric.critical,
    risky: selectedMetric.risky,
    breakdown,
  };

  return {
    tab,
    selectedSource,
    metrics,
    selectedSourceDetails,
  };
}
