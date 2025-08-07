import { useCallback, useEffect, useState } from 'react';
import { useCove } from './useCove';

export function useFeatureFlag(flagName: string, defaultValue = false): boolean {
  const { config, isInitialized } = useCove();
  const [isEnabled, setIsEnabled] = useState(defaultValue);

  const checkFlag = useCallback(async () => {
    if (!isInitialized || !config?.apiKey) {
      setIsEnabled(defaultValue);
      return;
    }

    try {
      // In a real implementation, this would fetch from your feature flag service
      if (config.debug) {
        console.log(`[Cove SDK] Checking feature flag: ${flagName}`);
      }

      // Simulate feature flag check
      const mockFlags: Record<string, boolean> = {
        'new-dashboard': true,
        'beta-features': config.environment === 'development',
        'analytics-v2': false,
      };

      setIsEnabled(mockFlags[flagName] ?? defaultValue);
    } catch (error) {
      if (config.debug) {
        console.error(`[Cove SDK] Failed to check feature flag ${flagName}:`, error);
      }
      setIsEnabled(defaultValue);
    }
  }, [flagName, defaultValue, isInitialized, config]);

  useEffect(() => {
    checkFlag();
  }, [checkFlag]);

  return isEnabled;
}
