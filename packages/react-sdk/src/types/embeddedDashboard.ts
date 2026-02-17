import type { CoveEmbedMessage } from './embedMessage';

// Cove Embedded Dashboard Types
export interface CoveEmbeddedDashboardProps {
  /** Use production (app.cove.dev) or sandbox (sandbox.cove.dev) environment (default: true) */
  isLive?: boolean;
  /** Embed token for authentication (obtained from your backend via Cove API) */
  embedToken?: string;
  /** Height of the iframe (default: 800) */
  height?: number | string;
  /** Width of the iframe (default: "100%") */
  width?: number | string;
  /** Iframe allow attribute for permissions (default: "camera; microphone; accelerometer") */
  allow?: string;
  /** Callback fired for all messages from the embedded dashboard */
  onMessage?: (data: CoveEmbedMessage) => void;
}

export type CoveEmbeddedDashboardOrigin =
  | 'https://app.cove.dev'
  | 'https://sandbox.cove.dev'
  | 'http://localhost:3000'
  | 'http://localhost:3001';
