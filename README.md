# Cove JS SDK

A modern TypeScript SDK for building Cove applications.

## Packages

- `@cove/react-sdk` - React components and hooks for Cove integration
- `@cove/types` - (Internal) TypeScript type definitions
- `@cove/utils` - (Internal) Utility functions

## Installation

```bash
npm install @cove/react-sdk
# or
pnpm add @cove/react-sdk
```

## Usage

```tsx
import { CoveProvider, useCove } from '@cove/react-sdk';

function App() {
  return (
    <CoveProvider config={{ apiKey: 'your-api-key' }}>
      <YourApp />
    </CoveProvider>
  );
}

function YourApp() {
  const cove = useCove();
  // Use the Cove SDK
}
```

## Development

This project uses:
- **pnpm** for package management
- **TypeScript** for type safety
- **Biome** for linting and formatting
- **Vitest** for testing
- **Changesets** for version management

### Getting Started

```bash
# Install dependencies
pnpm install

# Start development
pnpm dev

# Run tests
pnpm test

# Check code quality
pnpm check
```

### Contributing

Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for development workflow and guidelines.

## License

MIT