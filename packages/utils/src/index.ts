import type { Nullable, Result } from '@getcove/types';

/**
 * Type guard to check if a value is null or undefined
 * @param value The value to check
 * @returns true if the value is null or undefined
 */
export function isNullOrUndefined<T>(value: T | null | undefined): value is null | undefined {
  return value === null || value === undefined;
}

/**
 * Type guard to check if a value is defined (not null or undefined)
 * @param value The value to check
 * @returns true if the value is defined
 */
export function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

/**
 * Safely executes a synchronous function and returns a Result
 * @param fn The function to execute
 * @returns A Result containing either the value or an error
 */
export function trySync<T>(fn: () => T): Result<T> {
  try {
    return { ok: true, value: fn() };
  } catch (error) {
    return { ok: false, error: error as Error };
  }
}

/**
 * Safely executes an asynchronous function and returns a Result
 * @param fn The async function to execute
 * @returns A Promise of Result containing either the value or an error
 */
export async function tryAsync<T>(fn: () => Promise<T>): Promise<Result<T>> {
  try {
    const value = await fn();
    return { ok: true, value };
  } catch (error) {
    return { ok: false, error: error as Error };
  }
}

/**
 * Creates a debounced version of a function
 * @param fn The function to debounce
 * @param delay The delay in milliseconds
 * @returns A debounced version of the function
 */
export function debounce<Args extends unknown[], R>(
  fn: (...args: Args) => R,
  delay: number,
): (...args: Args) => void {
  let timeoutId: Nullable<NodeJS.Timeout> = null;

  return (...args: Args) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Delays execution for a specified number of milliseconds
 * @param ms The number of milliseconds to sleep
 * @returns A Promise that resolves after the delay
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
