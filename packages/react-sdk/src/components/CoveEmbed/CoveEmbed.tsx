import type React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { CoveEmbedMessage, CoveEmbedOrigin, CoveEmbedProps } from '../../types/embed';

const ALLOWED_ORIGINS: CoveEmbedOrigin[] = [
  'https://app.cove.dev',
  'https://sandbox.cove.dev',
  'http://localhost:3000',
  'http://localhost:3001',
];

export const CoveEmbed: React.FC<CoveEmbedProps> = ({
  url,
  height = 800,
  width = '100%',
  allow = 'camera; microphone; accelerometer',
  onComplete,
  onMessage,
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [showIframe, setShowIframe] = useState(true);

  const getIframeOrigin = useCallback(() => {
    try {
      const urlObj = new URL(url);
      return urlObj.origin;
    } catch {
      return null;
    }
  }, [url]);

  const isValidOrigin = useCallback((origin: string): origin is CoveEmbedOrigin => {
    return ALLOWED_ORIGINS.includes(origin as CoveEmbedOrigin);
  }, []);

  const handleMessage = useCallback(
    (event: MessageEvent) => {
      // Verify origin for security
      if (!isValidOrigin(event.origin)) {
        return;
      }

      const data: CoveEmbedMessage = event.data;

      // Forward message to iframe if needed
      if (iframeRef.current?.contentWindow) {
        const iframeOrigin = getIframeOrigin();
        if (iframeOrigin && isValidOrigin(iframeOrigin)) {
          iframeRef.current.contentWindow.postMessage(data, iframeOrigin);
        }
      }

      // Call user-provided message handler
      onMessage?.(data);

      // Handle completion
      if (data.source === 'cove-embed' && data.status === 'USER_COMPLETE') {
        onComplete?.(data);

        // Remove iframe on completion (React-idiomatic way)
        setShowIframe(false);
      }
    },
    [onComplete, onMessage, isValidOrigin, getIframeOrigin],
  );

  useEffect(() => {
    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [handleMessage]);

  if (!showIframe) {
    return null;
  }

  return (
    <iframe
      ref={iframeRef}
      title="Cove Embed"
      id="cove-embed"
      src={url}
      height={height}
      width={width}
      allow={allow}
      sandbox="allow-scripts allow-forms"
    />
  );
};
