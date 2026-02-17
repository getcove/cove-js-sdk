import type React from 'react';
import { useCallback, useEffect, useRef } from 'react';
import type {
  CoveEmbeddedDashboardOrigin,
  CoveEmbeddedDashboardProps,
} from '../../types/embeddedDashboard';
import { type CoveEmbedMessage, EmbedSignal } from '../../types/embedMessage';

const ALLOWED_ORIGINS: CoveEmbeddedDashboardOrigin[] = [
  'https://app.cove.dev',
  'https://sandbox.cove.dev',
  'http://localhost:3000',
  'http://localhost:3001',
];

const getDefaultDashboardUrl = (isLive: boolean): string => {
  const domain = isLive ? 'app.cove.dev' : 'sandbox.cove.dev';
  // : 'localhost:3000';
  // return `http://${domain}/embed/applications`;
  return `https://${domain}/embed/applications`;
};

export const CoveEmbeddedDashboard: React.FC<CoveEmbeddedDashboardProps> = ({
  isLive = true,
  embedToken,
  height = 800,
  width = '100%',
  allow = 'camera; microphone; accelerometer',
  onMessage,
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const lastAuthTokenRef = useRef<string | null>(null);
  const dashboardUrl = getDefaultDashboardUrl(isLive);

  const getIframeOrigin = useCallback(() => {
    try {
      const urlObj = new URL(dashboardUrl);
      return urlObj.origin;
    } catch {
      return null;
    }
  }, [dashboardUrl]);

  const isValidOrigin = useCallback((origin: string): origin is CoveEmbeddedDashboardOrigin => {
    return ALLOWED_ORIGINS.includes(origin as CoveEmbeddedDashboardOrigin);
  }, []);

  const handleMessage = useCallback(
    (event: MessageEvent) => {
      // Verify origin for security
      if (!isValidOrigin(event.origin)) {
        return;
      }

      const data = event.data;
      if (!data || typeof data !== 'object' || data.source !== 'cove-embed') {
        return;
      }

      const messageData: CoveEmbedMessage = data;

      // If iframe is ready for auth, send the auth message (skip if same token already sent)
      if (
        data.signal === EmbedSignal.READY &&
        data.status === 'READY_FOR_AUTH' &&
        embedToken &&
        lastAuthTokenRef.current !== embedToken
      ) {
        const iframeOrigin = getIframeOrigin();
        if (iframeRef.current?.contentWindow && iframeOrigin && isValidOrigin(iframeOrigin)) {
          const authMessage = {
            source: 'cove-embed-partner',
            signal: EmbedSignal.AUTHENTICATE,
            token: embedToken,
          } satisfies CoveEmbedMessage;
          iframeRef.current.contentWindow.postMessage(authMessage, iframeOrigin);
          lastAuthTokenRef.current = embedToken;
          console.log('[CoveEmbeddedDashboard] Auth sent');
        }
      }

      // Call user-provided message handler
      if (onMessage) {
        onMessage(messageData);
      }
    },
    [onMessage, isValidOrigin, getIframeOrigin, embedToken],
  );

  const handleIframeLoad = useCallback(() => {
    // Waiting for READY message from iframe
  }, []);

  useEffect(() => {
    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [handleMessage]);

  return (
    <iframe
      ref={iframeRef}
      title="Cove Embedded Dashboard"
      id="cove-embedded-dashboard"
      src={dashboardUrl}
      height={height}
      width={width}
      allow={allow}
      sandbox="allow-scripts allow-forms allow-same-origin"
      onLoad={handleIframeLoad}
    />
  );
};
