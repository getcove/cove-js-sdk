import { CoveEmbed, type CoveEmbedMessage } from '@getcove/react-sdk';

interface IdentityVerificationExampleProps {
  coveUrl: string;
}

export function IdentityVerificationExample({ coveUrl }: IdentityVerificationExampleProps) {
  const handleComplete = (data: CoveEmbedMessage) => {
    console.log('Cove flow completed:', data);
  };

  const handleMessage = (data: CoveEmbedMessage) => {
    console.log('Cove message received:', data);
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
  );
}
