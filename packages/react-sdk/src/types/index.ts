export interface CoveConfig {
  apiKey?: string;
  baseUrl?: string;
  debug?: boolean;
}

export interface CoveProviderProps {
  children: React.ReactNode;
  config?: CoveConfig;
}
