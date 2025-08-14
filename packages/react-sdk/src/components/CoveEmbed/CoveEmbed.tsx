import type React from 'react';
import { useCallback, useEffect, useRef } from 'react';
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
  onComplete,
  onMessage,
  iframeProps,
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

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
        iframeRef.current.contentWindow.postMessage(data, '*');
      }

      // Call user-provided message handler
      onMessage?.(data);

      // Handle completion
      if (data.source === 'cove-embed' && data.status === 'USER_COMPLETE') {
        onComplete?.(data);

        // Remove iframe on completion (matching original behavior)
        if (iframeRef.current) {
          iframeRef.current.remove();
        }
      }
    },
    [onComplete, onMessage, isValidOrigin],
  );

  useEffect(() => {
    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [handleMessage]);

  return (
    <iframe
      ref={iframeRef}
      title="Cove Embed"
      id="cove-embed"
      src={url}
      height={height}
      width={width}
      allow="camera; microphone; accelerometer"
      sandbox="allow-scripts allow-same-origin allow-forms"
      {...iframeProps}
    />
  );
};
