import { describe, expect, it } from 'vitest';
import { noop } from './index';

describe('noop', () => {
  it('is a function', () => {
    expect(typeof noop).toBe('function');
  });
});
