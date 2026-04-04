import {
  AlertTriangle,
  CheckCircle2,
  GitBranch,
  Search,
  Target,
  Globe,
  Layers,
  Clock,
  User,
  Shield,
  FolderOpen,
} from 'lucide-react';
import type { FilterGroup } from '../types/findings';

export const vcsFilterConfig: FilterGroup[] = [
  {
    category: 'severity',
    label: 'Severity',
    icon: AlertTriangle,
    defaultSelected: ['critical', 'high'],
    options: [
      { id: 'critical', label: 'Critical' },
      { id: 'high', label: 'High' },
      { id: 'medium', label: 'Medium' },
      { id: 'low', label: 'Low' },
    ],
  },
  {
    category: 'status',
    label: 'Status',
    icon: CheckCircle2,
    options: [
      { id: 'auto_fixed', label: 'Auto Fixed' },
      { id: 'ticket_created', label: 'Ticket Created' },
      { id: 'rotated', label: 'Rotated' },
      { id: 'moved_to_vault', label: 'Moved to Vault' },
      { id: 'ignored', label: 'Ignored' },
      { id: 'pending', label: 'Pending' },
    ],
  },
  {
    category: 'gitProvider',
    label: 'Git Provider',
    icon: GitBranch,
    defaultSelected: ['github', 'gitlab', 'bitbucket'],
    options: [
      { id: 'github', label: 'GitHub' },
      { id: 'gitlab', label: 'GitLab' },
      { id: 'bitbucket', label: 'Bitbucket' },
    ],
  },
  {
    category: 'detectorType',
    label: 'Detector Type',
    icon: Search,
    defaultSelected: ['groq', 'postman', 'gcp'],
    options: [
      { id: 'groq', label: 'Groq' },
      { id: 'postman', label: 'Postman' },
      { id: 'gcp', label: 'GCP' },
      { id: 'github_action', label: 'GitHub Action' },
      { id: 'gitlab_ci', label: 'GitLab CI' },
    ],
  },
  {
    category: 'blastRadius',
    label: 'Blast Radius',
    icon: Target,
    options: [
      { id: 'low', label: 'Low' },
      { id: 'medium', label: 'Medium' },
      { id: 'high', label: 'High' },
    ],
  },
  {
    category: 'secretExposure',
    label: 'Secret Exposure',
    icon: Globe,
    options: [
      { id: 'public', label: 'Public Repo' },
      { id: 'private', label: 'Private Repo' },
      { id: 'unknown', label: 'Unknown' },
    ],
  },
  {
    category: 'occurrences',
    label: 'Occurrences',
    icon: Layers,
    options: [
      { id: '1', label: '1' },
      { id: '2-5', label: '2–5' },
      { id: '5+', label: '5+' },
    ],
  },
  {
    category: 'createdTime',
    label: 'Created Time',
    icon: Clock,
    options: [
      { id: 'last_24h', label: 'Last 24 hours' },
      { id: 'last_7d', label: 'Last 7 days' },
      { id: 'last_30d', label: 'Last 30 days' },
      { id: 'older', label: 'Older' },
    ],
  },
  {
    category: 'ownership',
    label: 'Ownership',
    icon: User,
    options: [
      { id: 'assigned', label: 'Assigned' },
      { id: 'unassigned', label: 'Unassigned' },
    ],
  },
  {
    category: 'secretValidity',
    label: 'Secret Validity',
    icon: Shield,
    options: [
      { id: 'active', label: 'Active' },
      { id: 'expired', label: 'Expired' },
      { id: 'revoked', label: 'Revoked' },
    ],
  },
  {
    category: 'repository',
    label: 'Repository',
    icon: FolderOpen,
    options: [
      { id: 'repo_1', label: 'backend-api' },
      { id: 'repo_2', label: 'frontend' },
      { id: 'repo_3', label: 'infrastructure' },
      { id: 'repo_4', label: 'mobile-app' },
    ],
  },
];
