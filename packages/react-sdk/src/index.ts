import type { Nullable } from '@cove/types';
import { createContext, createElement, type ReactNode, useContext } from 'react';

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
  return createElement(CoveContext.Provider, { value: config ?? null }, children);
}

export function useCove(): Nullable<CoveConfig> {
  return useContext(CoveContext);
}
