import { render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { EmbedSignal } from '../../types/embedMessage';
import { CoveEmbeddedDashboard } from './CoveEmbeddedDashboard';

describe('CoveEmbeddedDashboard', () => {
  let postMessageSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    postMessageSpy = vi.fn();
    // Mock the iframe's contentWindow.postMessage
    Object.defineProperty(HTMLIFrameElement.prototype, 'contentWindow', {
      configurable: true,
      get() {
        return {
          postMessage: postMessageSpy,
        };
      },
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should export CoveEmbeddedDashboard component', () => {
    expect(CoveEmbeddedDashboard).toBeDefined();
  });

  it('should render iframe with correct default props', () => {
    render(<CoveEmbeddedDashboard />);

    const iframe = screen.getByTitle('Cove Embedded Dashboard');
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute('id', 'cove-embedded-dashboard');
    expect(iframe).toHaveAttribute('height', '800');
    expect(iframe).toHaveAttribute('width', '100%');
    expect(iframe).toHaveAttribute('allow', 'camera; microphone; accelerometer');
    expect(iframe).toHaveAttribute('sandbox', 'allow-scripts allow-forms allow-same-origin');
  });

  it('should use sandbox URL by default (isLive defaults to false)', () => {
    render(<CoveEmbeddedDashboard />);

    const iframe = screen.getByTitle('Cove Embedded Dashboard');
    expect(iframe).toHaveAttribute('src', 'https://sandbox.cove.dev/embed/applications');
  });

  it('should use production URL when isLive is explicitly true', () => {
    render(<CoveEmbeddedDashboard isLive={true} />);

    const iframe = screen.getByTitle('Cove Embedded Dashboard');
    expect(iframe).toHaveAttribute('src', 'https://app.cove.dev/embed/applications');
  });

  it('should use sandbox URL when isLive is false', () => {
    render(<CoveEmbeddedDashboard isLive={false} />);

    const iframe = screen.getByTitle('Cove Embedded Dashboard');
    expect(iframe).toHaveAttribute('src', 'https://sandbox.cove.dev/embed/applications');
  });

  it('should accept custom height and width', () => {
    render(<CoveEmbeddedDashboard height={600} width="80%" />);

    const iframe = screen.getByTitle('Cove Embedded Dashboard');
    expect(iframe).toHaveAttribute('height', '600');
    expect(iframe).toHaveAttribute('width', '80%');
  });

  it('should accept custom allow attribute', () => {
    render(<CoveEmbeddedDashboard allow="camera; microphone" />);

    const iframe = screen.getByTitle('Cove Embedded Dashboard');
    expect(iframe).toHaveAttribute('allow', 'camera; microphone');
  });

  it('should send AUTHENTICATE message when receiving READY signal with embedToken', async () => {
    const embedToken = 'test-embed-token-123';
    render(<CoveEmbeddedDashboard embedToken={embedToken} isLive={true} />);

    const messageData = {
      source: 'cove-embed',
      signal: EmbedSignal.READY,
      status: 'READY_FOR_AUTH',
    };

    // Create a message event from an allowed origin
    const messageEvent = new MessageEvent('message', {
      data: messageData,
      origin: 'https://app.cove.dev',
    });

    window.dispatchEvent(messageEvent);

    await waitFor(() => {
      expect(postMessageSpy).toHaveBeenCalledWith(
        {
          source: 'cove-embed-partner',
          signal: EmbedSignal.AUTHENTICATE,
          token: embedToken,
        },
        'https://app.cove.dev',
      );
    });
  });

  it('should send auth message to sandbox origin when isLive is false', async () => {
    const embedToken = 'test-embed-token-456';
    render(<CoveEmbeddedDashboard embedToken={embedToken} isLive={false} />);

    const messageData = {
      source: 'cove-embed',
      signal: EmbedSignal.READY,
      status: 'READY_FOR_AUTH',
    };

    const messageEvent = new MessageEvent('message', {
      data: messageData,
      origin: 'https://sandbox.cove.dev',
    });

    window.dispatchEvent(messageEvent);

    await waitFor(() => {
      expect(postMessageSpy).toHaveBeenCalledWith(
        {
          source: 'cove-embed-partner',
          signal: EmbedSignal.AUTHENTICATE,
          token: embedToken,
        },
        'https://sandbox.cove.dev',
      );
    });
  });

  it('should not send auth message when embedToken is not provided', async () => {
    render(<CoveEmbeddedDashboard />);

    const messageData = {
      source: 'cove-embed',
      signal: EmbedSignal.READY,
      status: 'READY_FOR_AUTH',
    };

    const messageEvent = new MessageEvent('message', {
      data: messageData,
      origin: 'https://sandbox.cove.dev',
    });

    window.dispatchEvent(messageEvent);

    // Wait a bit to ensure no message was sent
    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(postMessageSpy).not.toHaveBeenCalled();
  });

  it('should only send auth message once (prevent loop)', async () => {
    const embedToken = 'test-embed-token-789';
    render(<CoveEmbeddedDashboard embedToken={embedToken} isLive={true} />);

    const messageData = {
      source: 'cove-embed',
      signal: EmbedSignal.READY,
      status: 'READY_FOR_AUTH',
    };

    // Send READY message twice
    const messageEvent1 = new MessageEvent('message', {
      data: messageData,
      origin: 'https://app.cove.dev',
    });
    const messageEvent2 = new MessageEvent('message', {
      data: messageData,
      origin: 'https://app.cove.dev',
    });

    window.dispatchEvent(messageEvent1);
    window.dispatchEvent(messageEvent2);

    await waitFor(() => {
      expect(postMessageSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('should call onMessage callback when valid message is received', async () => {
    const onMessage = vi.fn();
    render(<CoveEmbeddedDashboard onMessage={onMessage} />);

    const messageData = {
      source: 'cove-embed',
      signal: EmbedSignal.AUTH_SUCCESS,
      status: 'AUTHENTICATED',
    };

    const messageEvent = new MessageEvent('message', {
      data: messageData,
      origin: 'https://sandbox.cove.dev',
    });

    window.dispatchEvent(messageEvent);

    await waitFor(() => {
      expect(onMessage).toHaveBeenCalledWith(messageData);
    });
  });

  it('should not call onMessage for messages from disallowed origins', async () => {
    const onMessage = vi.fn();
    render(<CoveEmbeddedDashboard onMessage={onMessage} />);

    const messageData = {
      source: 'cove-embed',
      signal: EmbedSignal.READY,
      status: 'test',
    };

    const messageEvent = new MessageEvent('message', {
      data: messageData,
      origin: 'https://evil.com',
    });

    window.dispatchEvent(messageEvent);

    // Wait a bit to ensure no callback was triggered
    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(onMessage).not.toHaveBeenCalled();
  });

  it('should not process messages without cove-embed source', async () => {
    const onMessage = vi.fn();
    render(<CoveEmbeddedDashboard onMessage={onMessage} />);

    const messageData = {
      source: 'other-source',
      signal: EmbedSignal.READY,
      status: 'test',
    };

    const messageEvent = new MessageEvent('message', {
      data: messageData,
      origin: 'https://sandbox.cove.dev',
    });

    window.dispatchEvent(messageEvent);

    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(onMessage).not.toHaveBeenCalled();
  });

  it('should accept messages from all allowed origins', async () => {
    const onMessage = vi.fn();
    render(<CoveEmbeddedDashboard onMessage={onMessage} />);

    const allowedOrigins = [
      'https://app.cove.dev',
      'https://sandbox.cove.dev',
      'http://localhost:3000',
      'http://localhost:3001',
    ];

    for (const origin of allowedOrigins) {
      const messageData = {
        source: 'cove-embed',
        signal: EmbedSignal.AUTH_SUCCESS,
        status: 'test',
        origin,
      };

      const messageEvent = new MessageEvent('message', {
        data: messageData,
        origin,
      });

      window.dispatchEvent(messageEvent);
    }

    await waitFor(() => {
      expect(onMessage).toHaveBeenCalledTimes(allowedOrigins.length);
    });
  });

  it('should update iframe src when isLive prop changes', () => {
    const { rerender } = render(<CoveEmbeddedDashboard isLive={true} />);

    let iframe = screen.getByTitle('Cove Embedded Dashboard');
    expect(iframe).toHaveAttribute('src', 'https://app.cove.dev/embed/applications');

    rerender(<CoveEmbeddedDashboard isLive={false} />);

    iframe = screen.getByTitle('Cove Embedded Dashboard');
    expect(iframe).toHaveAttribute('src', 'https://sandbox.cove.dev/embed/applications');
  });
});
