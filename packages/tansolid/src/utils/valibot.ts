import * as v from 'valibot';

/**
 * Modes of parsing strictness/options.
 */
type Options = 'typed' | 'strict' | 'low';

/**
 * Creates a synchronous parser function for the provided Valibot schema.
 * @template T - The Valibot schema type.
 * @template Ty - The parsing option/strictness mode.
 * @param schema - The Valibot schema.
 * @param typed - The strictness option ('typed', 'strict', or 'low'). Defaults to 'typed'.
 * @returns A parsing function that takes a value and validates it against the schema.
 */
export const create = <
  const T extends v.BaseSchema<unknown, unknown, v.BaseIssue<unknown>>,
  Ty extends Options = 'typed',
>(
  schema: T,
  typed?: Ty,
) => {
  const _typed = typed || 'typed';
  const out = (value => {
    const method =
      _typed === 'typed' || _typed === 'strict' ? v.parse : v.safeParse;
    return method(schema, value);
  }) as (
    value: Ty extends 'typed' ? v.InferInput<T> : unknown,
  ) => Ty extends 'typed' | 'strict'
    ? v.InferOutput<T>
    : v.SafeParseResult<T>;

  return out;
};

/**
 * Creates an asynchronous parser function for the provided Valibot schema.
 * @template T - The Valibot schema type.
 * @template Ty - The parsing option/strictness mode.
 * @param schema - The Valibot schema.
 * @param typed - The strictness option ('typed', 'strict', or 'low'). Defaults to 'typed'.
 * @returns A promise-based parsing function that takes a value and validates it against the schema.
 */
export const createAsync = <
  const T extends v.BaseSchema<unknown, unknown, v.BaseIssue<unknown>>,
  Ty extends Options = 'typed',
>(
  schema: T,
  typed?: Ty,
) => {
  const _typed = typed || 'typed';
  const out = (value => {
    const method =
      _typed === 'typed' || _typed === 'strict'
        ? v.parseAsync
        : v.safeParseAsync;
    return method(schema, value);
  }) as (
    value: Ty extends 'typed' ? v.InferInput<T> : unknown,
  ) => Promise<
    Ty extends 'typed' | 'strict' ? v.InferOutput<T> : v.SafeParseResult<T>
  >;
  return out;
};
