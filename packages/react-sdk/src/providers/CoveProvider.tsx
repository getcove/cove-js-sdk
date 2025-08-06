import type { Nullable } from '@cove/types';
import { createContext } from 'react';
import type { CoveConfig, CoveProviderProps } from '../types';

export const CoveContext = createContext<Nullable<CoveConfig>>(null);

export function CoveProvider({ children, config }: CoveProviderProps) {
  return <CoveContext.Provider value={config ?? null}>{children}</CoveContext.Provider>;
}
