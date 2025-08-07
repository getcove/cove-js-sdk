# @cove/react-sdk

## 0.1.3

### Patch Changes

- 7d732c4: Fix Release workflow to create PRs targeting main branch instead of develop

## 0.1.2

### Patch Changes

- 85861f7: Fix workflow configuration to ensure Release PRs target main branch

## 0.1.1

### Patch Changes

- 59da2d9: Improve documentation and add JSDoc comments across all packages for better developer experience
- Updated dependencies [59da2d9]
  - @cove/utils@0.0.1
  - @cove/types@0.0.1

## 0.1.0

### Minor Changes

- 9e1708d: Initial release of @cove/react-sdk with core functionality:

  - Added CoveProvider with initialization lifecycle and state management
  - Enhanced useCove hook to return complete SDK state (isInitialized, isLoading, error, config)
  - Added useFeatureFlag hook for feature flag management
  - Added environment configuration support (development, staging, production)
  - Added debug mode for development logging
  - Exported CoveState type for better TypeScript support
