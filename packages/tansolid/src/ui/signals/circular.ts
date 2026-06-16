import { createSignal } from 'solid-js';
import { circularDirection } from '../helpers';

/**
 * Creates a signal state for circular navigation, tracking current index and animation direction.
 * @param last - The maximum boundary index (inclusive).
 * @param index - The initial index. Defaults to 0.
 * @returns An object containing the current state accessors, setter, and navigation helpers (next, prev, effect).
 */
export const createCircular = (last: number, index = 0) => {
  const [direction, setDirection] = createSignal<1 | -1>(1);
  const [current, setCurrent] = createSignal(index);

  const effect = (index: number) => {
    const _direction = circularDirection(index, current(), last);
    setDirection(_direction);
    setCurrent(index);
  };

  const next = () => {
    effect((current() + 1) % (last + 1));
  };

  const prev = () => {
    effect((current() - 1 + (last + 1)) % (last + 1));
  };

  return {
    direction,
    current,
    setCurrent,
    next,
    prev,
    effect,
  };
};
