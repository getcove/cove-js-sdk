export enum EmbedSignal {
  READY = 'READY', // Iframe → Parent: Ready to receive auth
  AUTHENTICATE = 'AUTHENTICATE', // Parent → Iframe: Send token to authenticate
  AUTH_RECEIVED = 'AUTH_RECEIVED', // Iframe → Parent: Token received, processing
  AUTH_SUCCESS = 'AUTH_SUCCESS', // Iframe → Parent: Authentication successful
  AUTH_ERROR = 'AUTH_ERROR', // Iframe → Parent: Authentication failed
}

export type CoveEmbedMessage = {
  source: string;
  signal?: EmbedSignal;
  status?: string;
  token?: string;
  errorMessage?: string;
};
