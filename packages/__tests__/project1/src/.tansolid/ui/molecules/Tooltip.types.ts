import type { JSX } from 'solid-js';
import type { POSITIONS } from './Tooltip.constants';
import type { OmitPropsOf } from '../../types';

/**
 * Allowed positions for the tooltip relative to the target element.
 */
/**
 * Position type - Auto-generated expression
 * 
 * ⚠️ WARNING: This expression is auto-generated and should not be modified.
 * Any manual changes will be overwritten during the next generation.
 * 
 * @generated
 * @readonly
 * @author chlbri (bri_lvi@icloud.com)
 */
export type Position = (typeof POSITIONS)[number];

/**
 * Properties for the Tooltip component.
 */
/**
 * ToolTipProps type - Auto-generated expression
 * 
 * ⚠️ WARNING: This expression is auto-generated and should not be modified.
 * Any manual changes will be overwritten during the next generation.
 * 
 * @generated
 * @readonly
 * @author chlbri (bri_lvi@icloud.com)
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

    