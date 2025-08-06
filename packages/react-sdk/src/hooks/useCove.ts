import type { Nullable } from '@cove/types';
import { useContext } from 'react';
import { CoveContext } from '../providers/CoveProvider';
import type { CoveConfig } from '../types';

export function useCove(): Nullable<CoveConfig> {
  const context = useContext(CoveContext);

  if (context === undefined) {
    throw new Error('useCove must be used within a CoveProvider');
  }

  return context;
}
