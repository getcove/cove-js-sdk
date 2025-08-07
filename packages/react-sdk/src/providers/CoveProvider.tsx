import { createContext, useEffect, useMemo, useState } from 'react';
import type { CoveProviderProps, CoveState } from '../types';

export const CoveContext = createContext<CoveState | undefined>(undefined);

export function CoveProvider({ children, config }: CoveProviderProps) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const initialize = async () => {
      if (!config) {
        setIsInitialized(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        // Simulate initialization logic
        if (config.debug) {
          console.log('[Cove SDK] Initializing with config:', {
            ...config,
            apiKey: config.apiKey ? '***' : undefined,
          });
        }

        // Here you would typically validate the API key, connect to services, etc.
        await new Promise((resolve) => setTimeout(resolve, 100));

        setIsInitialized(true);
        if (config.debug) {
          console.log('[Cove SDK] Initialization complete');
        }
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to initialize Cove SDK');
        setError(error);
        if (config.debug) {
          console.error('[Cove SDK] Initialization failed:', error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    initialize();
  }, [config]);

  const value = useMemo(
    () => ({
      isInitialized,
      isLoading,
      error,
      config: config ?? null,
    }),
    [isInitialized, isLoading, error, config],
  );

  return <CoveContext.Provider value={value}>{children}</CoveContext.Provider>;
}
