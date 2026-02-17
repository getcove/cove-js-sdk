# @getcove/react-sdk

## 0.2.0

### Minor Changes

- [#85](https://github.com/getcove/cove-js-sdk/pull/85) [`26570f1`](https://github.com/getcove/cove-js-sdk/commit/26570f1d97c02cb721960f390c55e54156259134) Thanks [@cove-cyril](https://github.com/cove-cyril)! - Add CoveEmbeddedDashboard component for applications dashboard embedding

  - New `CoveEmbeddedDashboard` component to embed Cove applications dashboard
  - Support `embedToken` prop for iframe authentication via postMessage
  - Environment switching with `isLive` prop (production vs sandbox)
  - Sends `AUTHENTICATE` message in response to `READY` signal from iframe
  - Secure origin validation for all messages
  - Comprehensive test suite with 14 test cases
  - Updated react-example with separate component files for each use case

## 0.1.4

### Patch Changes

- [#69](https://github.com/getcove/cove-js-sdk/pull/69) [`5fa1cae`](https://github.com/getcove/cove-js-sdk/commit/5fa1cae5d3bba872cdea9b7df262f2c255836874) Thanks [@phillycove](https://github.com/phillycove)! - Update environment variable example from session-id to screening-id for better clarity

## 0.1.3

### Patch Changes

- [#66](https://github.com/getcove/cove-js-sdk/pull/66) [`6df7a0e`](https://github.com/getcove/cove-js-sdk/commit/6df7a0e0cadfceb84b1268b26aee66d359a79fe5) Thanks [@phillycove](https://github.com/phillycove)! - Fix CORS error by adding allow-same-origin to iframe sandbox

## 0.1.2

### Patch Changes

- Bump version to 0.1.2

## 0.1.1

- Bump version to 0.1.1

## 0.1.0

### Minor Changes

- [#36](https://github.com/getcove/cove-js-sdk/pull/36) [`57b395e`](https://github.com/getcove/cove-js-sdk/commit/57b395e36612cabc0b95ff26433fbbd4ad00cd07) Thanks [@phillycove](https://github.com/phillycove)! - feat: add CoveEmbed component and reorganize package structure

  - Add CoveEmbed React component for iframe integration
  - Implement secure origin validation and message handling
  - Reorganize package structure with components/, types/, and utils/ folders
  - Add comprehensive TypeScript interfaces for embed functionality
  - Support configurable iframe props and event callbacks

### Patch Changes

- [#32](https://github.com/getcove/cove-js-sdk/pull/32) [`aca949c`](https://github.com/getcove/cove-js-sdk/commit/aca949c22fdbfba5cce8a5a04de4932fbf76b1db) Thanks [@phillycove](https://github.com/phillycove)! - Consolidate monorepo by removing separate types/utils packages

- [#57](https://github.com/getcove/cove-js-sdk/pull/57) [`695ace3`](https://github.com/getcove/cove-js-sdk/commit/695ace3960f14af111ff2f7ff9f2e856068bb127) Thanks [@phillycove](https://github.com/phillycove)! - Update documentation to reflect new develop-based release workflow

## 0.0.2

### Patch Changes

- [#26](https://github.com/getcove/cove-js-sdk/pull/26) [`b7bf873`](https://github.com/getcove/cove-js-sdk/commit/b7bf8730fad210b2faf338f652e83936c3cd81bf) Thanks [@phillycove](https://github.com/phillycove)! - Add minimal test files to all packages to satisfy CI requirements

- Updated dependencies [[`b7bf873`](https://github.com/getcove/cove-js-sdk/commit/b7bf8730fad210b2faf338f652e83936c3cd81bf)]:
  - @getcove/types@0.0.1
  - @getcove/utils@0.0.1

## 0.0.1

### Patch Changes

- [`e9af1cd`](https://github.com/getcove/cove-js-sdk/commit/e9af1cdf54de5a22d99b9c76dc1079fe6bb45edc) - Add README documentation with installation and requirements

## 0.0.0

### Initial Setup

- Initial package setup
