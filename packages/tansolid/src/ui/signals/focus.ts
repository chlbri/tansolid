import { createSignal } from 'solid-js';

/**
 * Global signal representing the ID or name of the currently focused element.
 */
export const [toFocus, setFocus] = createSignal<string | undefined>(
  undefined,
);
