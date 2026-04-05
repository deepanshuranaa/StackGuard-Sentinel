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
  const rand = createSeededRandom(hashString(`chart-${period}`));

  const generateData = (days: number): RiskTrendDataPoint[] => {
    const data: RiskTrendDataPoint[] = [];
    const now = new Date('2026-04-05T00:00:00');
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const dateStr = `${month}/${day}`;
      const baseRisk = 20 + Math.sin(i * 0.5) * 25 + rand() * 15;
      data.push({
        date: dateStr,
        risk: Math.min(100, Math.max(0, Math.round(baseRisk))),
      });
    }
    return data;
  };

  const generateMonthData = (months: number): RiskTrendDataPoint[] => {
    const data: RiskTrendDataPoint[] = [];
    const now = new Date('2026-04-05T00:00:00');
    for (let i = months - 1; i >= 0; i--) {
      const date = new Date(now);
      date.setMonth(date.getMonth() - i);
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const dateStr = `${month}/${day}`;
      const baseRisk = 25 + Math.sin(i * 0.3) * 28 + rand() * 12;
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

// Deterministic seeded PRNG to avoid SSR/client hydration mismatches
function createSeededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function hashString(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 33) ^ str.charCodeAt(i);
  }
  return Math.abs(hash);
}

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
  const rand = createSeededRandom(hashString(`insights-${tab}`));
  const sources = sourceNames[tab];
  const selectedSource = sources[0]; // Default to first source

  // Generate top 10 sources with varying critical/risky counts
  const metrics: SourceMetric[] = sources.slice(0, 10).map((source, idx) => {
    const baseTotal = Math.floor(rand() * 8) + 2;
    const critical = Math.floor(baseTotal * (0.6 + rand() * 0.3));
    const risky = Math.max(0, baseTotal - critical - Math.floor(rand() * 2));
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
    count: Math.floor(rand() * 5) + 1,
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
