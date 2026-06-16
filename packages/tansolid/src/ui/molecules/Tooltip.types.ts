import type { JSX } from 'solid-js';
import type { POSITIONS } from './Tooltip.constants';
import type { OmitPropsOf } from '../../types';

/**
 * Allowed positions for the tooltip relative to the target element.
 */
export type Position = (typeof POSITIONS)[number];

/**
 * Properties for the Tooltip component.
 */
export type ToolTipProps = {
  /** The content of the tooltip (JSX element or string). */
  tooltip: JSX.Element;
  /** Delay in milliseconds before showing the tooltip. */
  showDelay?: number;
  /** Delay in milliseconds before hiding the tooltip. */
  hideDelay?: number;
  /** The tooltip placement relative to the element. Defaults to 'top'. */
  position?: Position;
} & OmitPropsOf<'div'>;
