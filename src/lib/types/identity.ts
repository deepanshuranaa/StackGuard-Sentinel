export type IdentityType = 'api_key' | 'service_account' | 'token';
export type SeverityLevel = 'critical' | 'high' | 'medium' | 'low';

export type Identity = {
  id: string;
  name: string;
  type: IdentityType;
  createdAt: Date;
  lastUsed: Date | null;
  riskScore: number; // 0-100
  permissionCount: number;
  isCompromised: boolean;
};
