export default {
  // Run comprehensive checks on JS/TS files
  '*.{js,jsx,ts,tsx}': [
    // Step 1: Format with Biome
    'biome format --write --no-errors-on-unmatched',

    // Step 2: Lint with Biome
    'biome check --write --no-errors-on-unmatched',

    // Step 3: Type check (run once for all files)
    () => 'pnpm typecheck',

    // Step 4: Run tests related to changed files
    (filenames) => `vitest related ${filenames.join(' ')} --run`,
  ],

  // Format other file types (JSON, MD, YAML, etc.)
  '*.{json,md,yml,yaml}': 'biome format --write --no-errors-on-unmatched',
};
