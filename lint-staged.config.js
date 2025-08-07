export default {
  // Run Biome check (includes both formatting and linting) on all JS/TS files
  '*.{js,jsx,ts,tsx}': [
    'biome check --write --no-errors-on-unmatched',
    // Run tests related to changed files
    (filenames) => `vitest related ${filenames.join(' ')} --run`,
  ],

  // Format other file types (JSON, MD, YAML, etc.)
  '*.{json,md,yml,yaml}': 'biome format --write --no-errors-on-unmatched',
};
