/**
 * Checks if a given index is within the boundaries of the array.
 * @param data - The array to check bounds against.
 * @param index - The index to verify.
 * @returns True if the index is in bounds, false otherwise.
 */
export const inBounds = (data: any[], index: number) => {
  const out = data.map((_, i) => i).includes(index);

  return out;
};

/**
 * Creates a filter function to check if an object matches the given partial object.
 * @template T - The object type.
 * @param data - A partial object with keys and values to match.
 * @returns A predicate function that takes an object and returns true if it matches.
 */
export function narrowFilter<T>(data: Partial<T>): (data: T) => boolean;

/**
 * Creates a filter function to check if an object has a key equal to the given value.
 * @template T - The object type.
 * @param key - The key of the object to compare.
 * @param value - The value to compare against.
 * @returns A predicate function that takes an object and returns true if it matches.
 */
export function narrowFilter<T>(
  key: keyof T,
  value: T[typeof key],
): (data: T) => boolean;

/**
 * Implementation of narrowFilter which supports filtering by a single key-value pair or by multiple properties in an object.
 */
export function narrowFilter<T>(arg1: any, arg2?: unknown) {
  const out = (data: T) => {
    if (typeof arg1 === 'string') {
      const key = arg1 as keyof T;
      return data[key] === arg2;
    }

    for (const key in arg1) {
      if (Object.prototype.hasOwnProperty.call(arg1, key)) {
        const elm1 = arg1[key];
        const elm2 = (data as any)[key];
        if (elm1 !== elm2) return false;
      }
    }

    return true;
  };

  return out;
}
