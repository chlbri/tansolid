import {
  createEffect,
  createMemo,
  on,
  type Accessor,
  type Component,
} from 'solid-js';
import { createTyping } from '../signals/createTyping';
import { VISIBLE_ESPACE } from '../constants';

/**
 * Base properties for the TypingText component.
 */
type BaseProps = {
  /** The text content to display using typing animation. */
  children: string;
  /** Custom CSS classes. */
  class?: string;
  /** Base typing interval speed in milliseconds. */
  interval?: number;
  /** Accessor to programmatically disable/bypass the typing animation. */
  disabled?: Accessor<boolean>;
};

/**
 * Union types for conditional rewind properties.
 */
type Props = BaseProps &
  (
    | {
        rewind: true;
        rewindDelay: number;
      }
    | { rewind?: false }
  );

/**
 * Component that animates typing of the text passed as children.
 * @param props - Custom options like interval speed, rewind loop mode, or disabled states.
 * @returns The rendered animated text container.
 */
export const TypingText: Component<Props> = props => {
  // #region Default values
  const min = props.interval ?? 62;
  const rewind = props.rewind ?? false;
  const rewindDelay = (props as any).rewindDelay ?? 500;
  const content = props.children;
  const disabled = createMemo(
    () => (props.disabled ? props.disabled() : false),
    false,
  );
  // #endregion

  const { text, type, setText } = createTyping({
    content,
    min,
    rewind,
    rewindDelay,
  });

  createEffect(on(disabled, () => setText(VISIBLE_ESPACE)));

  createEffect(() => {
    // If disabled, show full text immediately
    if (disabled()) setText(content);
    else type();
  });

  return <div class={props.class}>{text()}</div>;
};
