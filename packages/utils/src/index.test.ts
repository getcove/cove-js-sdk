import { describe, expect, it } from 'vitest';
import { isDefined, isNullOrUndefined, sleep, trySync } from './index';

describe('utils', () => {
  describe('isDefined', () => {
    it('should return true for defined values', () => {
      expect(isDefined(0)).toBe(true);
      expect(isDefined('')).toBe(true);
      expect(isDefined(false)).toBe(true);
      expect(isDefined([])).toBe(true);
    });

    it('should return false for null or undefined', () => {
      expect(isDefined(null)).toBe(false);
      expect(isDefined(undefined)).toBe(false);
    });
  });

  describe('isNullOrUndefined', () => {
    it('should return true for null or undefined', () => {
      expect(isNullOrUndefined(null)).toBe(true);
      expect(isNullOrUndefined(undefined)).toBe(true);
    });

    it('should return false for defined values', () => {
      expect(isNullOrUndefined(0)).toBe(false);
      expect(isNullOrUndefined('')).toBe(false);
      expect(isNullOrUndefined(false)).toBe(false);
    });
  });

  describe('trySync', () => {
    it('should return success result for successful operations', () => {
      const result = trySync(() => 42);
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.value).toBe(42);
      }
    });

    it('should return error result for failed operations', () => {
      const result = trySync(() => {
        throw new Error('Test error');
      });
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error.message).toBe('Test error');
      }
    });
  });

  describe('sleep', () => {
    it('should delay execution', async () => {
      const start = Date.now();
      await sleep(50);
      const duration = Date.now() - start;
      expect(duration).toBeGreaterThanOrEqual(45); // Allow small timing variance
    });
  });
});
