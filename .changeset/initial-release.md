---
"@cove/react-sdk": minor
---

Initial release of @cove/react-sdk with core functionality:

- Added CoveProvider with initialization lifecycle and state management
- Enhanced useCove hook to return complete SDK state (isInitialized, isLoading, error, config)
- Added useFeatureFlag hook for feature flag management
- Added environment configuration support (development, staging, production)
- Added debug mode for development logging
- Exported CoveState type for better TypeScript support