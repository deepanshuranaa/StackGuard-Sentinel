import type { VcsSecretFinding } from '../types/findings';

// Detector type metadata with icon identifiers
export const DETECTOR_META: Record<string, { label: string; icon: string }> = {
  groq: { label: 'Groq', icon: '9' },
  postman: { label: 'Postman', icon: '🟠' },
  gcp: { label: 'GCP', icon: '☁️' },
  gcp_application: { label: 'GCPapplication..', icon: '☁️' },
  openai: { label: 'OpenAI', icon: '🤖' },
  stripe: { label: 'Stripe', icon: '💳' },
  aws: { label: 'AWS', icon: '🔶' },
  slack: { label: 'Slack', icon: '💬' },
  anthropic: { label: 'Anthropic', icon: '🧠' },
};

// Git provider metadata with icon paths
export const GIT_PROVIDER_META: Record<string, { label: string; iconPath: string }> = {
  github: { label: 'GitHub', iconPath: '/assets/icons/github.svg' },
  gitlab: { label: 'GitLab', iconPath: '/assets/icons/gitlab.svg' },
  bitbucket: { label: 'Bitbucket', iconPath: '/assets/icons/github.svg' }, // fallback
};

// Status display metadata
export const STATUS_META: Record<string, { label: string; color: string }> = {
  auto_fixed: { label: 'Auto fixed', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' },
  ticket_created: { label: 'Ticket created', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
  rotated: { label: 'Rotated', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
  moved_to_vault: { label: 'Moved to vault', color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' },
  ignored: { label: 'Ignored', color: 'bg-gray-100 text-gray-600 dark:bg-gray-800/30 dark:text-gray-400' },
  pending: { label: 'Pending', color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' },
};

const detectorKeys = Object.keys(DETECTOR_META);
const gitProviders: VcsSecretFinding['gitProvider'][] = ['github', 'gitlab', 'bitbucket'];
const severities: VcsSecretFinding['severity'][] = ['critical', 'high', 'medium', 'low'];
const blastRadii: VcsSecretFinding['blastRadius'][] = ['low', 'medium', 'high'];
const exposures: VcsSecretFinding['exposure'][] = ['public', 'private', 'unknown'];
const validities: VcsSecretFinding['isValid'][] = ['active', 'expired', 'revoked'];

const statusActions = ['auto_fixed', 'ticket_created', 'rotated', 'moved_to_vault'] as const;

const repos = ['backend-api', 'frontend', 'infrastructure', 'mobile-app', 'auth-service', 'data-pipeline'];

// Seeded PRNG (mulberry32) — ensures identical output on server and client
function createSeededRandom(seed: number) {
  let s = seed | 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

let seededRandom = createSeededRandom(42);

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(seededRandom() * arr.length)];
}

function pickMultiple<T>(arr: readonly T[], min: number, max: number): T[] {
  const count = min + Math.floor(seededRandom() * (max - min + 1));
  const shuffled = [...arr].sort(() => 0.5 - seededRandom());
  return shuffled.slice(0, count);
}

// Fixed reference date to avoid Date.now() SSR/client mismatch
const REFERENCE_DATE = new Date('2026-04-04T00:00:00Z').getTime();

function generateFinding(index: number): VcsSecretFinding {
  const severity = index < 2 ? 'critical' : index < 16 ? 'high' : pick(severities);
  const isCritical = severity === 'critical';
  const isHigh = severity === 'high';

  // Critical → more occurrences, higher blast radius, more statuses
  const occurrences = isCritical
    ? 3 + Math.floor(seededRandom() * 15)
    : isHigh
      ? 2 + Math.floor(seededRandom() * 8)
      : 1 + Math.floor(seededRandom() * 4);

  const blastRadius: VcsSecretFinding['blastRadius'] = isCritical
    ? 'high'
    : isHigh
      ? pick(['medium', 'high'])
      : pick(blastRadii);

  const actions = isCritical
    ? pickMultiple(statusActions, 2, 4)
    : isHigh
      ? pickMultiple(statusActions, 1, 3)
      : pickMultiple(statusActions, 0, 2);

  const detectorKey = pick(detectorKeys);
  const daysAgo = Math.floor(seededRandom() * 90);
  const createdAt = new Date(REFERENCE_DATE - daysAgo * 86400000).toISOString();
  const lastDetectedDaysAgo = Math.floor(seededRandom() * daysAgo);
  const lastDetected = new Date(REFERENCE_DATE - lastDetectedDaysAgo * 86400000).toISOString();

  return {
    id: `finding-${String(index + 1).padStart(3, '0')}`,
    severity,
    detectorType: detectorKey,
    gitProvider: pick(gitProviders),
    status: actions.length > 0 ? actions[actions.length - 1] as VcsSecretFinding['status'] : 'pending',
    secret: `sk_live_${'x'.repeat(8 + Math.floor(seededRandom() * 16))}`,
    secretMask: '••••••••••',
    occurrences,
    blastRadius,
    exposure: isCritical ? pick(['public', 'private']) : pick(exposures),
    repository: pick(repos),
    branch: pick(['main', 'develop', 'staging', 'feature/auth', 'release/v2']),
    createdAt,
    lastDetected,
    owner: seededRandom() > 0.4 ? pick(['alice', 'bob', 'charlie', 'diana', 'eve']) : undefined,
    isValid: isCritical ? 'active' : pick(validities),
    actions: actions as string[],
  };
}

let _cachedFindings: VcsSecretFinding[] | null = null;

export function generateMockFindings(count: number = 178): VcsSecretFinding[] {
  if (_cachedFindings && _cachedFindings.length === count) return _cachedFindings;
  // Reset seed so server and client produce identical data
  seededRandom = createSeededRandom(42);
  _cachedFindings = Array.from({ length: count }, (_, i) => generateFinding(i));
  return _cachedFindings;
}
