import { act, cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { CoveEmbedMessage } from '../../types/embedMessage';
import { CoveEmbed } from './CoveEmbed';

let addEventListenerSpy: ReturnType<typeof vi.spyOn>;
let removeEventListenerSpy: ReturnType<typeof vi.spyOn>;

describe('CoveEmbed', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    addEventListenerSpy = vi.spyOn(window, 'addEventListener');
    removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
  });

  afterEach(() => {
    cleanup();
    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });

  it('exports CoveEmbed component', () => {
    expect(CoveEmbed).toBeDefined();
    expect(typeof CoveEmbed).toBe('function');
  });

  it('renders iframe with correct props', () => {
    const testUrl = 'https://sandbox.cove.dev/s/test-session';

    render(<CoveEmbed url={testUrl} height={600} width="100%" />);

    const iframe = screen.getByTitle('Cove Embed');
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute('src', testUrl);
    expect(iframe).toHaveAttribute('height', '600');
    expect(iframe).toHaveAttribute('width', '100%');
    expect(iframe).toHaveAttribute('id', 'cove-embed');
    expect(iframe).toHaveAttribute('allow', 'camera; microphone; accelerometer');
    expect(iframe).toHaveAttribute('sandbox', 'allow-scripts allow-forms allow-same-origin');
  });

  it('uses default props when not provided', () => {
    const testUrl = 'https://app.cove.dev/test';

    render(<CoveEmbed url={testUrl} />);

    const iframe = screen.getByTitle('Cove Embed');
    expect(iframe).toHaveAttribute('height', '800');
    expect(iframe).toHaveAttribute('width', '100%');
    expect(iframe).toHaveAttribute('allow', 'camera; microphone; accelerometer');
  });

  it('accepts custom allow permissions', () => {
    const testUrl = 'https://app.cove.dev/test';
    const customAllow = 'microphone; camera';

    render(<CoveEmbed url={testUrl} allow={customAllow} />);

    const iframe = screen.getByTitle('Cove Embed');
    expect(iframe).toHaveAttribute('allow', customAllow);
  });

  it('sets up message event listener on mount', () => {
    render(<CoveEmbed url="https://sandbox.cove.dev/test" />);

    expect(addEventListenerSpy).toHaveBeenCalledWith('message', expect.any(Function));
  });

  it('removes message event listener on unmount', () => {
    const { unmount } = render(<CoveEmbed url="https://sandbox.cove.dev/test" />);

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('message', expect.any(Function));
  });

  it('calls onMessage callback when message is received from allowed origin', () => {
    const mockOnMessage = vi.fn();
    const testMessage: CoveEmbedMessage = {
      source: 'cove-embed',
      status: 'PROCESSING',
    };

    render(<CoveEmbed url="https://app.cove.dev/test" onMessage={mockOnMessage} />);

    act(() => {
      window.dispatchEvent(
        new MessageEvent('message', {
          data: testMessage,
          origin: 'https://app.cove.dev',
        } as MessageEventInit),
      );
    });

    expect(mockOnMessage).toHaveBeenCalledWith(testMessage);
  });

  it('calls onComplete callback and hides iframe on USER_COMPLETE', () => {
    const mockOnComplete = vi.fn();
    const completeMessage: CoveEmbedMessage = {
      source: 'cove-embed',
      status: 'USER_COMPLETE',
    };

    render(<CoveEmbed url="https://sandbox.cove.dev/test" onComplete={mockOnComplete} />);

    // Verify iframe is initially rendered
    expect(screen.getByTitle('Cove Embed')).toBeInTheDocument();

    act(() => {
      window.dispatchEvent(
        new MessageEvent('message', {
          data: completeMessage,
          origin: 'https://sandbox.cove.dev',
        } as MessageEventInit),
      );
    });

    expect(mockOnComplete).toHaveBeenCalledWith(completeMessage);

    // Iframe should be removed from DOM after completion
    expect(screen.queryByTitle('Cove Embed')).not.toBeInTheDocument();
  });

  it('ignores messages from unauthorized origins', () => {
    const mockOnMessage = vi.fn();
    const testMessage: CoveEmbedMessage = {
      source: 'cove-embed',
      status: 'PROCESSING',
    };

    render(<CoveEmbed url="https://app.cove.dev/test" onMessage={mockOnMessage} />);

    act(() => {
      window.dispatchEvent(
        new MessageEvent('message', {
          data: testMessage,
          origin: 'https://malicious-site.com',
        } as MessageEventInit),
      );
    });

    expect(mockOnMessage).not.toHaveBeenCalled();
  });

  it('validates allowed origins correctly', () => {
    const mockOnMessage = vi.fn();
    const testMessage: CoveEmbedMessage = {
      source: 'cove-embed',
      status: 'PROCESSING',
    };

    render(<CoveEmbed url="https://app.cove.dev/test" onMessage={mockOnMessage} />);

    // Test all allowed origins by dispatching real MessageEvents
    const allowedOrigins = [
      'https://app.cove.dev',
      'https://sandbox.cove.dev',
      'http://localhost:3000',
      'http://localhost:3001',
    ];

    act(() => {
      allowedOrigins.forEach((origin) => {
        window.dispatchEvent(
          new MessageEvent('message', {
            data: testMessage,
            origin,
          } as MessageEventInit),
        );
      });
    });

    expect(mockOnMessage).toHaveBeenCalledTimes(allowedOrigins.length);
  });
});
