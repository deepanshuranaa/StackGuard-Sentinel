import {
  ShieldAlert,
  KeyRound,
  ScanEye,
  Server,
  Globe,
  Clock,
  Building,
  Flame,
  UserCheck,
  Route,
  Lock,
  Calendar,
  TriangleAlert,
} from 'lucide-react';
import type { FilterGroup } from '../types/dashboard';

export const filterConfig: FilterGroup[] = [
  {
    category: 'severity',
    label: 'Severity / Risk Level',
    icon: ShieldAlert,
    defaultSelected: ['critical', 'high'],
    options: [
      { id: 'critical', label: 'Critical' },
      { id: 'high', label: 'High' },
      { id: 'medium', label: 'Medium' },
      { id: 'low', label: 'Low' },
    ],
  },
  {
    category: 'identityType',
    label: 'Identity Type',
    icon: KeyRound,
    options: [
      { id: 'api_key', label: 'API Key' },
      { id: 'service_account', label: 'Service Account' },
      { id: 'oauth_token', label: 'OAuth Token' },
      { id: 'ssh_key', label: 'SSH Key' },
    ],
  },
  {
    category: 'accessScope',
    label: 'Access Scope',
    icon: ScanEye,
    options: [
      { id: 'read', label: 'Read' },
      { id: 'write', label: 'Write' },
      { id: 'admin', label: 'Admin / Full Access' },
    ],
  },
  {
    category: 'resourceType',
    label: 'Resource Type',
    icon: Server,
    options: [
      { id: 'database', label: 'Database' },
      { id: 'storage', label: 'Storage (S3 / Buckets)' },
      { id: 'compute', label: 'Compute (VMs, Containers)' },
      { id: 'cicd', label: 'CI/CD' },
      { id: 'secrets_manager', label: 'Secrets Manager' },
    ],
  },
  {
    category: 'exposureLevel',
    label: 'Exposure Level',
    icon: Globe,
    options: [
      { id: 'public', label: 'Publicly Exposed' },
      { id: 'internal', label: 'Internal Only' },
      { id: 'unknown', label: 'Unknown' },
    ],
  },
  {
    category: 'lastUsed',
    label: 'Last Used / Activity',
    icon: Clock,
    options: [
      { id: 'active', label: 'Active (last 7d)' },
      { id: 'dormant', label: 'Dormant' },
      { id: 'never', label: 'Never Used' },
    ],
  },
  {
    category: 'environment',
    label: 'Environment',
    icon: Building,
    options: [
      { id: 'production', label: 'Production' },
      { id: 'staging', label: 'Staging' },
      { id: 'development', label: 'Development' },
    ],
  },
  {
    category: 'blastRadius',
    label: 'Blast Radius Size',
    icon: Flame,
    options: [
      { id: 'small', label: 'Small (1–3 resources)' },
      { id: 'medium', label: 'Medium (4–10)' },
      { id: 'large', label: 'Large (10+)' },
    ],
  },
  {
    category: 'ownership',
    label: 'Ownership',
    icon: UserCheck,
    options: [
      { id: 'assigned', label: 'Assigned' },
      { id: 'unassigned', label: 'Unassigned' },
    ],
  },
  {
    category: 'attackPath',
    label: 'Attack Path Length',
    icon: Route,
    options: [
      { id: 'direct', label: 'Direct Access' },
      { id: 'one_hop', label: '1-hop' },
      { id: 'multi_hop', label: 'Multi-hop (chained)' },
    ],
  },
  {
    category: 'permissionRisk',
    label: 'Permission Risk Pattern',
    icon: Lock,
    options: [
      { id: 'over_privileged', label: 'Over-privileged' },
      { id: 'least_privilege', label: 'Least privilege compliant' },
      { id: 'unknown', label: 'Unknown' },
    ],
  },
  {
    category: 'creationAge',
    label: 'Creation Age',
    icon: Calendar,
    options: [
      { id: 'lt_7d', label: '< 7 days' },
      { id: '7_30d', label: '7–30 days' },
      { id: 'gt_30d', label: '30+ days' },
    ],
  },
  {
    category: 'anomalies',
    label: 'Anomalies',
    icon: TriangleAlert,
    options: [
      { id: 'unusual_access', label: 'Unusual access patterns' },
    ],
  },
];
