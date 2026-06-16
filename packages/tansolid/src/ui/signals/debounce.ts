import { createSignal, type Accessor, type Setter } from 'solid-js';

/**
 * Creates a debounced version of a function that delays execution until after `ms` milliseconds have elapsed since the last call.
 * @template T - The type of argument passed to the function.
 * @param action - The function to debounce.
 * @param ms - The delay in milliseconds. Defaults to 1000.
 * @returns A debounced function with a `.cancel()` method to cancel pending execution.
 */
export function createDebounce<T>(action: (arg: T) => void, ms = 1000) {
  let timerHandle: NodeJS.Timeout;

  const debounce = (value: T) => {
    clearTimeout(timerHandle);
    timerHandle = setTimeout(() => action(value), ms);
  };
  debounce.cancel = () => clearTimeout(timerHandle);

  return debounce;
}

/**
 * Options for creating a debounced signal.
 */
type Options<T> = {
  /** The debounce delay in milliseconds. */
  ms?: number;
  /** Action callback triggered when value is resolved. */
  action?: (value: T) => void;
  /** Optional temporary ending state value to toggle back to after debounce. */
  end?: T;
};

/**
 * Creates a debounced signal that reverts to a start state after debouncing.
 * @template T - The type of the signal value.
 * @param start - The starting state.
 * @param options - Configuration containing delay, action, and the temporary 'end' state.
 * @returns A tuple of accessor and triggering function.
 */
export function createDebounceSignal<T>(
  start: T,
  options: Omit<Options<T>, 'end'> & Required<Pick<Options<T>, 'end'>>,
): readonly [
  Accessor<T>,
  {
    (): void;
    cancel: () => void;
  },
];

/**
 * Creates a debounced signal.
 * @template T - The type of the signal value.
 * @param start - The starting state.
 * @param options - Configuration containing delay and action callback.
 * @returns A tuple of accessor, trigger function, and manual setter.
 */
export function createDebounceSignal<T>(
  start: T,
  options?: Omit<Options<T>, 'end'>,
): readonly [
  Accessor<T>,
  {
    (value: T): void;
    cancel: () => void;
  },
  setter: Setter<T>,
];

/**
 * Implementation of createDebounceSignal.
 */
export function createDebounceSignal<T>(start: T, options?: Options<T>) {
  const { ms = 500, action, end } = options ?? {};
  const [signal, _setSignal] = createSignal(start);

  const setSignal = (value: T) => {
    if (action) {
      action(value);
    }

    _setSignal(value as any);
  };

  const debounce = createDebounce<T>(setSignal, ms);

  if (end) {
    const debounce2 = () => {
      setSignal(end as any);
      debounce(start);
    };
    debounce2.cancel = debounce.cancel;

    return [signal, debounce2] as any;
  }

  return [signal, debounce, setSignal] as any;
}

/**
 * Short alias for {@link createDebounceSignal}.
 */
export const cds = createDebounceSignal;

/**
 * Creates a debounced boolean signal that toggles and then reverts back to the initial value.
 * @param args - Configuration options including initial state, delay, and action callback.
 * @returns A debounced signal tuple.
 */
export const toggleDebounceBool = (
  args?: { initial?: boolean } & Omit<Options<boolean>, 'end'>,
) => {
  const { ms = 500, initial = true, action } = args ?? {};
  return cds(initial, { ms, end: !initial, action });
};
