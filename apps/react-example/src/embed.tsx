import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { IdentityVerificationExample } from './IdentityVerificationExample';

const coveUrl = import.meta.env.VITE_COVE_EMBED_URL;

if (!coveUrl) {
  ReactDOM.render(
    <div style={{ padding: '2rem', fontFamily: 'system-ui' }}>
      <h1>Configuration Error</h1>
      <p>Please set VITE_COVE_EMBED_URL in your .env file</p>
      <p>Copy .env.example to .env and update the URL</p>
    </div>,
    document.getElementById('root'),
  );
} else {
  ReactDOM.render(
    <StrictMode>
      <IdentityVerificationExample coveUrl={coveUrl} />
    </StrictMode>,
    document.getElementById('root'),
  );
}
