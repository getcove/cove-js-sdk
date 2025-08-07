# @cove/react-sdk

## 0.1.0

### Minor Changes

- 9e1708d: Initial release of @cove/react-sdk with core functionality:

  - Added CoveProvider with initialization lifecycle and state management
  - Enhanced useCove hook to return complete SDK state (isInitialized, isLoading, error, config)
  - Added useFeatureFlag hook for feature flag management
  - Added environment configuration support (development, staging, production)
  - Added debug mode for development logging
  - Exported CoveState type for better TypeScript support
