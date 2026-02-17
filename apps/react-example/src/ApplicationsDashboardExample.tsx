import { CoveEmbeddedDashboard, type CoveEmbedMessage } from '@getcove/react-sdk';
import { useState } from 'react';

export function ApplicationsDashboardExample() {
  const [isLive, setIsLive] = useState(false);

  // Mock embed token for example purposes only.
  // In production, never hardcode real tokens. Fetch the embed token from your backend
  // (for example via an environment variable) which exchanges a partner_token for an
  // embed_token via the Cove API.
  const embedToken = 'TEST_EMBED_TOKEN_REPLACE_ME';

  const handleDashboardMessage = (data: CoveEmbedMessage) => {
    console.log('Dashboard message received:', data);
  };

  return (
    <div
      style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        padding: '1.5rem',
        border: '1px solid #e2e8f0',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem',
        }}
      >
        <h2
          style={{
            fontSize: '1.5rem',
            fontWeight: '500',
            color: '#374151',
            margin: '0',
          }}
        >
          Applications Dashboard
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.9rem', color: '#64748b' }}>Environment:</span>
          <button
            type="button"
            onClick={() => setIsLive(!isLive)}
            style={{
              padding: '0.5rem 1rem',
              fontSize: '0.9rem',
              fontWeight: '500',
              color: 'white',
              backgroundColor: isLive ? '#3b82f6' : '#f59e0b',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {isLive ? 'Production' : 'Sandbox'}
          </button>
        </div>
      </div>

      <div
        style={{
          backgroundColor: '#f1f5f9',
          borderRadius: '8px',
          padding: '1rem',
          marginBottom: '1.5rem',
          border: '1px solid #cbd5e1',
        }}
      >
        <p
          style={{
            color: '#475569',
            fontSize: '0.9rem',
            margin: '0 0 0.75rem 0',
            lineHeight: '1.5',
          }}
        >
          This iframe displays the Cove applications dashboard, showing all applications in one
          view. Toggle between production (app.cove.dev) and sandbox (sandbox.cove.dev) environments
          using the button above.
        </p>
        <p
          style={{
            color: '#475569',
            fontSize: '0.9rem',
            margin: '0',
            lineHeight: '1.5',
          }}
        >
          <strong>Authentication:</strong> Pass an <code>embedToken</code> prop to authenticate
          users. Get the token from your backend by exchanging a partner token via the Cove API. See
          the integration guide for details.
        </p>
      </div>

      <div
        style={{
          borderRadius: '8px',
          overflow: 'hidden',
          backgroundColor: '#ffffff',
        }}
      >
        <CoveEmbeddedDashboard
          isLive={isLive}
          embedToken={embedToken}
          height={700}
          width="100%"
          onMessage={handleDashboardMessage}
        />
      </div>
    </div>
  );
}
