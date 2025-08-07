export interface CoveConfig {
  apiKey?: string;
  baseUrl?: string;
  environment?: 'development' | 'staging' | 'production';
  debug?: boolean;
}

export interface CoveProviderProps {
  children: React.ReactNode;
  config?: CoveConfig;
}

export interface CoveState {
  isInitialized: boolean;
  isLoading: boolean;
  error: Error | null;
  config: CoveConfig | null;
}
