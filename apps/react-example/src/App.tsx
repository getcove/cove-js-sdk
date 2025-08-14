import { CoveEmbed, type CoveEmbedMessage } from '@getcove/react-sdk';

function App() {
  const coveUrl = import.meta.env.VITE_COVE_EMBED_URL;

  const handleComplete = (data: CoveEmbedMessage) => {
    console.log('Cove flow completed:', data);
  };

  const handleMessage = (data: CoveEmbedMessage) => {
    console.log('Cove message received:', data);
  };

  if (!coveUrl) {
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

      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          padding: '1.5rem',
          border: '1px solid #e2e8f0',
        }}
      >
        <h2
          style={{
            fontSize: '1.5rem',
            fontWeight: '500',
            color: '#374151',
            marginBottom: '1rem',
          }}
        >
          Cove Identity Verification
        </h2>

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
              margin: '0',
              lineHeight: '1.5',
            }}
          >
            This iframe contains the Cove identity verification flow. The component handles secure
            communication and auto-removal on completion.
          </p>
        </div>

        <div
          style={{
            borderRadius: '8px',
            overflow: 'hidden',
            backgroundColor: '#ffffff',
          }}
        >
          <CoveEmbed
            url={coveUrl}
            height={700}
            width="100%"
            onComplete={handleComplete}
            onMessage={handleMessage}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
