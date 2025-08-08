import { describe, expect, it } from 'vitest';
import { useCove } from './index';

describe('useCove', () => {
  it('returns initialized state', () => {
    const result = useCove();
    expect(result.initialized).toBe(true);
  });
});
