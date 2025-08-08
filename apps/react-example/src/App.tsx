import { useCove } from '@getcove/react-sdk';

function App() {
  const cove = useCove();

  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui' }}>
      <h1>@getcove/react-sdk Playground</h1>
      <div style={{ marginTop: '2rem' }}>
        <h2>SDK Status</h2>
        <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '4px' }}>
          {JSON.stringify(cove, null, 2)}
        </pre>
      </div>
    </div>
  );
}

export default App;
