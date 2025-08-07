import { useContext } from 'react';
import { CoveContext } from '../providers/CoveProvider';
import type { CoveState } from '../types';

export function useCove(): CoveState {
  const context = useContext(CoveContext);

  if (context === undefined) {
    throw new Error('useCove must be used within a CoveProvider');
  }

  return context;
}
