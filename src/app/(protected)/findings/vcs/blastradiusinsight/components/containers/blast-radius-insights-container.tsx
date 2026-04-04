'use client';

import { useMemo } from 'react';
import { transformBlastRadiusData } from '../../lib/blast-radius-util';
import { getMockBlastRadiusData } from '../../lib/blast-radius-mock';
import { BlastRadiusInsightsView } from '../views/blast-radius-insights-view';

export function BlastRadiusInsightsContainer() {
  const data = useMemo(() => {
    const raw = getMockBlastRadiusData();
    return transformBlastRadiusData(raw);
  }, []);

  return <BlastRadiusInsightsView data={data} />;
}
