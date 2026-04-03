export const SPACING = {
  xs: '0.25rem',   // 4px
  sm: '0.5rem',    // 8px
  md: '1rem',      // 16px
  lg: '1.5rem',    // 24px
  xl: '2rem',      // 32px
  xxl: '3rem',     // 48px
} as const;

export const TYPOGRAPHY = {
  h1: { size: '32px', weight: 700, lineHeight: '1.2' },
  h2: { size: '24px', weight: 700, lineHeight: '1.3' },
  h3: { size: '20px', weight: 600, lineHeight: '1.4' },
  body: { size: '14px', weight: 400, lineHeight: '1.6' },
  caption: { size: '12px', weight: 400, lineHeight: '1.5' },
} as const;

export const SEVERITY_LEVELS = {
  critical: { color: '#DC2626', label: 'Critical', score: 4 },
  high: { color: '#EA580C', label: 'High', score: 3 },
  medium: { color: '#FBBF24', label: 'Medium', score: 2 },
  low: { color: '#10B981', label: 'Low', score: 1 },
} as const;

export const BREAKPOINTS = {
  mobile: '640px',
  tablet: '1024px',
  desktop: '1280px',
} as const;
