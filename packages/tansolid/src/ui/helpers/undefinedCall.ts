import type { JSX } from 'solid-js';
import type { Fn } from '../../types';

/**
 * Extract the event handler from SolidJS JSX camelCase event handlers.
 */
type CamelCaseHandler<T> =
  JSX.CustomEventHandlersCamelCase<T>[keyof JSX.CustomEventHandlersCamelCase<T>];

/**
 * Type definition for the undefinedCall helper.
 */
export type UndefinedCall_F = <T>(
  fn: CamelCaseHandler<T> | undefined,
  ...args: Parameters<Extract<typeof fn, Fn>>
) => ReturnType<Extract<typeof fn, Fn>> | undefined;

/**
 * Safely calls an event handler function if it is defined, otherwise returns undefined.
 * @param fn - The event handler function, or undefined.
 * @param args - The arguments to pass to the function.
 * @returns The result of the function if it was called, otherwise undefined.
 */
export const undefinedCall: UndefinedCall_F = (fn, ...args) => {
  if (!fn) return;
  const _fn: any = fn;
  const type = typeof _fn;
  return type === 'function' ? _fn(...args) : undefined;
};
