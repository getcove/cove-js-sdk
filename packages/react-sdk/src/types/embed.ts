// Cove Embed Types
export interface CoveEmbedProps {
  /** The URL for the Cove embed */
  url: string;
  /** Height of the iframe (default: 800) */
  height?: number | string;
  /** Width of the iframe (default: "100%") */
  width?: number | string;
  /** Iframe allow attribute for permissions (default: "camera; microphone; accelerometer") */
  allow?: string;
  /** Callback fired when user completes the flow */
  onComplete?: (data: CoveEmbedMessage) => void;
  /** Callback fired for all messages from the embed */
  onMessage?: (data: CoveEmbedMessage) => void;
}

export interface CoveEmbedMessage {
  source: string;
  status: string;
  [key: string]: unknown;
}

export type CoveEmbedOrigin =
  | 'https://app.cove.dev'
  | 'https://sandbox.cove.dev'
  | 'http://localhost:3000'
  | 'http://localhost:3001';
