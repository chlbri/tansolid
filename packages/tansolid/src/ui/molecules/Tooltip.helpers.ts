import type { Position } from './Tooltip.types';

/**
 * Resolves the CSS Tailwind classes for positioning a tooltip relative to its parent element.
 * @param position - The preferred position. Defaults to 'top'.
 * @param computedPosition - Fallback/computed screen position ('top' or 'bottom') if layout-flipping is required.
 * @returns CSS class string.
 */
export const getPositionClass = (
  position: Position = 'top',
  computedPosition?: 'top' | 'bottom',
) => {
  const positions: Record<Position, string> = {
    top: 'bottom-full left-1/2 -translate-x-1/2 -translate-y-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 translate-y-2',
    left: 'right-full top-1/2 -translate-y-1/2 -translate-x-2',
    right: 'left-full top-1/2 -translate-y-1/2 translate-x-2',
    'top-left': 'bottom-full right-0 -translate-y-2',
    'top-right': 'bottom-full left-0 -translate-y-2',
    'bottom-left': 'top-full right-0 translate-y-2',
    'bottom-right': 'top-full left-0 translate-y-2',
    'viewport-relative':
      computedPosition === 'bottom'
        ? 'top-full left-1/2 -translate-x-1/2 translate-y-2'
        : 'bottom-full left-1/2 -translate-x-1/2 -translate-y-2',
  };

  return positions[position];
};
