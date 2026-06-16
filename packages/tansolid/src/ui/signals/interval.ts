import { createEffect, onCleanup, type Accessor } from 'solid-js';
import { buildBoolean } from '../helpers';

/**
 * Options for the auto interval creator.
 */
type Options = {
  /** The interval delay in milliseconds. Defaults to 3000. */
  delay?: number;
  /** Condition to determine whether the interval is active. */
  start?: Accessor<boolean | undefined> | boolean;
};

/**
 * Creates an interval controller to start/stop recurring task execution.
 * @param callback - The function to call on each tick.
 * @param delay - The delay in milliseconds. Defaults to 3000.
 * @returns An object containing start and stop functions.
 */
export const createInterval = (callback: () => void, delay = 3000) => {
  let interval: NodeJS.Timeout;

  const start = (condition?: Options['start']) => {
    const _condition = buildBoolean(condition);
    if (!_condition) return stop();
    interval = setInterval(() => {
      callback();
    }, delay);
  };

  const stop = (condition?: Options['start']) => {
    const _condition = buildBoolean(condition);
    if (!_condition) return;
    if (interval) clearInterval(interval);
  };

  onCleanup(stop);
  return { start, stop };
};

/**
 * Automatically sets up and starts an interval effect based on condition properties.
 * @param callback - The function to call on each tick.
 * @param options - Configuration options containing delay and start condition.
 */
createInterval.auto = (callback: () => void, options: Options = {}) => {
  const { start } = createInterval(callback, options.delay);
  createEffect(() => start(options.start));
};
