import type { Nullable } from '@cove/types';
import { createContext, type ReactNode, useContext } from 'react';

export interface CoveConfig {
  apiKey?: string;
  baseUrl?: string;
  debug?: boolean;
}

const CoveContext = createContext<Nullable<CoveConfig>>(null);

export interface CoveProviderProps {
  children: ReactNode;
  config?: CoveConfig;
}

export function CoveProvider({ children, config }: CoveProviderProps) {
  return <CoveContext.Provider value={config ?? null}>{children}</CoveContext.Provider>;
}

export function useCove(): Nullable<CoveConfig> {
  return useContext(CoveContext);
}
