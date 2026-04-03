export type InsightsTab = 'vcs' | 'storage' | 'cloud-infra' | 'directory-services';

export interface SourceMetric {
  name: string;
  critical: number;
  risky: number;
  total: number;
}

export interface SourceBreakdown {
  name: string;
  count: number;
}

export interface SelectedSourceDetails {
  selectedValue: number;
  total: number;
  critical: number;
  risky: number;
  breakdown: SourceBreakdown[];
}

export interface InsightsTabData {
  tab: InsightsTab;
  selectedSource: string;
  metrics: SourceMetric[];
  selectedSourceDetails: SelectedSourceDetails;
}
