import type { Accessor } from 'solid-js';

/**
 * Resolves a condition (which can be a boolean or a SolidJS accessor returning a boolean) to a concrete boolean value.
 * @param condition - The condition to resolve. Defaults to true if undefined.
 * @returns The resolved boolean value.
 */
export const buildBoolean = (
  condition?: Accessor<boolean | undefined> | boolean,
) => {
  const _condition =
    typeof condition === 'function'
      ? (condition() ?? true)
      : (condition ?? true);
  return _condition;
};
