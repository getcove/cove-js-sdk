import { describe, expect, it } from 'vitest';
import type { Config } from './index';

describe('Config type', () => {
  it('can be used', () => {
    const config: Config = { apiKey: 'test' };
    expect(config.apiKey).toBe('test');
  });
});
