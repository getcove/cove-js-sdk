import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'dist/', 'build/', '*.config.ts', '*.config.js', '.changeset/'],
    },
    includeSource: ['packages/**/*.{js,ts}'],
    exclude: ['node_modules', 'dist', 'build'],
  },
});
