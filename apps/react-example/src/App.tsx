import { useState } from 'react';
import { ApplicationsDashboardExample } from './ApplicationsDashboardExample';
import { IdentityVerificationExample } from './IdentityVerificationExample';

type Tab = 'embed' | 'dashboard';

function App() {
  const coveUrl = import.meta.env.VITE_COVE_EMBED_URL;
  const [activeTab, setActiveTab] = useState<Tab>('embed');

  if (!coveUrl && activeTab === 'embed') {
    return (
      <div style={{ padding: '2rem', fontFamily: 'system-ui' }}>
        <h1>@getcove/react-sdk Playground</h1>
        <div style={{ marginTop: '2rem', color: 'red' }}>
          <h2>Configuration Error</h2>
          <p>Please set VITE_COVE_EMBED_URL in your .env file</p>
          <p>Copy .env.example to .env and update the URL</p>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: '2rem',
        fontFamily: 'system-ui',
        maxWidth: '1200px',
        margin: '0 auto',
        backgroundColor: '#f8fafc',
      }}
    >
      <h1
        style={{
          fontSize: '2rem',
          fontWeight: '600',
          color: '#1e293b',
          marginBottom: '0.5rem',
        }}
      >
        @getcove/react-sdk Playground
      </h1>
      <p
        style={{
          color: '#64748b',
          fontSize: '1.1rem',
          marginBottom: '2rem',
        }}
      >
        Demo application showcasing the Cove iframe integration
      </p>

      {/* Tab Navigation */}
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          marginBottom: '2rem',
          borderBottom: '2px solid #e2e8f0',
        }}
      >
        <button
          type="button"
          onClick={() => setActiveTab('embed')}
          style={{
            padding: '1rem 2rem',
            fontSize: '1rem',
            fontWeight: '500',
            color: activeTab === 'embed' ? '#3b82f6' : '#64748b',
            backgroundColor: 'transparent',
            border: 'none',
            borderBottom: activeTab === 'embed' ? '2px solid #3b82f6' : '2px solid transparent',
            marginBottom: '-2px',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          Identity Verification
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('dashboard')}
          style={{
            padding: '1rem 2rem',
            fontSize: '1rem',
            fontWeight: '500',
            color: activeTab === 'dashboard' ? '#3b82f6' : '#64748b',
            backgroundColor: 'transparent',
            border: 'none',
            borderBottom: activeTab === 'dashboard' ? '2px solid #3b82f6' : '2px solid transparent',
            marginBottom: '-2px',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          Applications Dashboard
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'embed' && <IdentityVerificationExample coveUrl={coveUrl} />}
      {activeTab === 'dashboard' && <ApplicationsDashboardExample />}
    </div>
  );
}

export default App;
