import { createSignal, onCleanup } from 'solid-js';
import { VISIBLE_ESPACE } from '../constants';
import { espace } from '../helpers/espace';

/**
 * Properties for the typing animation signal.
 */
type Props = {
  /** The text content to type out. */
  content: string;
  /** The base typing interval in milliseconds. */
  min: number;
  /** Whether the typing should delete itself and loop. Defaults to false. */
  rewind?: boolean;
  /** Delay before rewinding or typing again in milliseconds. Defaults to 500. */
  rewindDelay?: number;
};

/**
 * Creates a typing animation effect with text signals and state.
 * @param props - Configuration including content, typing speed boundaries, and rewind behavior.
 * @returns An object containing the current text signal, type trigger function, and manual setter.
 */
export const createTyping = ({ content, min, ...props }: Props) => {
  const rewind = props.rewind ?? false;
  const rewindDelay = (props as any).rewindDelay ?? 500;

  const OSCILLATION = Math.min(min / 10 + content.length / 10, 10);

  const [text, setText] = createSignal(VISIBLE_ESPACE);
  let timeoutId: number | NodeJS.Timeout;
  let index = 0;
  let isTyping = true;
  const max = min + OSCILLATION;
  let interval = min;
  let intervalDirection = 1; // 1 for incrementing, -1 for decrementing

  const type = () => {
    if (isTyping) {
      if (index < content.length) {
        setText(prev => prev + content[index]);
        index++;
        timeoutId = setTimeout(type, interval);
      } else if (rewind) {
        isTyping = false;
        // interval = min;
        intervalDirection = 1;
        timeoutId = setTimeout(type, rewindDelay);
      }
    } else {
      // Rewind mode
      if (index > 0) {
        index--;
        setText(espace(content.substring(0, index)));
        timeoutId = setTimeout(type, interval);
      } else {
        isTyping = true;
        // interval = min;
        intervalDirection = 1;
        timeoutId = setTimeout(type, rewindDelay);
      }
    }

    // Update interval with oscillation
    interval += intervalDirection;

    if (interval >= max) {
      intervalDirection = -1;
    } else if (interval <= min) {
      intervalDirection = 1;
    }
  };

  onCleanup(() => {
    if (timeoutId !== undefined) clearTimeout(timeoutId);
  });

  return { text, type, setText };
};
