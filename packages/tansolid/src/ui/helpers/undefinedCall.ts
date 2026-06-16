import type { JSX } from 'solid-js';
import type { Fn } from '../types';

type CamelCaseHandler<T> =
  JSX.CustomEventHandlersCamelCase<T>[keyof JSX.CustomEventHandlersCamelCase<T>];

export type UndefinedCall_F = <T>(
  fn: CamelCaseHandler<T> | undefined,
  ...args: Parameters<Extract<typeof fn, Fn>>
) => ReturnType<Extract<typeof fn, Fn>> | undefined;

export const undefinedCall: UndefinedCall_F = (fn, ...args) => {
  if (!fn) return;
  const _fn: any = fn;
  const type = typeof _fn;
  return type === 'function' ? _fn(...args) : undefined;
};
