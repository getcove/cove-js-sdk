/**
 * Represents a value that can be null
 * @template T The type of the value
 */
export type Nullable<T> = T | null;

/**
 * Represents a value that can be undefined
 * @template T The type of the value
 */
export type Optional<T> = T | undefined;

/**
 * Represents a value that can be null or undefined
 * @template T The type of the value
 */
export type Maybe<T> = T | null | undefined;

/**
 * Represents an asynchronous operation that may succeed or fail
 * @template T The success value type
 * @template E The error type (defaults to Error)
 */
export type AsyncResult<T, E = Error> = Promise<Result<T, E>>;

/**
 * Represents an operation that may succeed with a value or fail with an error
 * @template T The success value type
 * @template E The error type (defaults to Error)
 */
export type Result<T, E = Error> = { ok: true; value: T } | { ok: false; error: E };

/**
 * Recursively makes all properties in T optional
 * @template T The type to make deeply partial
 */
export type DeepPartial<T> = T extends object ? { [P in keyof T]?: DeepPartial<T[P]> } : T;

/**
 * Recursively makes all properties in T readonly
 * @template T The type to make deeply readonly
 */
export type DeepReadonly<T> = T extends (infer R)[]
  ? DeepReadonlyArray<R>
  : T extends object
    ? DeepReadonlyObject<T>
    : T;

interface DeepReadonlyArray<T> extends ReadonlyArray<DeepReadonly<T>> {}

type DeepReadonlyObject<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>;
};
