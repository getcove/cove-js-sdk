---
'@getcove/react-sdk': minor
---

Add CoveEmbeddedDashboard component for applications dashboard embedding

- New `CoveEmbeddedDashboard` component to embed Cove applications dashboard
- Support `embedToken` prop for iframe authentication via postMessage
- Environment switching with `isLive` prop (production vs sandbox)
- Automatic `COVE_EMBED_AUTH` message on iframe load
- Secure origin validation for all messages
- Comprehensive test suite with 14 test cases
- Updated react-example with separate component files for each use case
