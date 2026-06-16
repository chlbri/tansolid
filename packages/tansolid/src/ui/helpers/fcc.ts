import Color from 'color';

/**
 * Calculates a high-contrast foreground color (either 'white' or 'black') for a given background color.
 * @param color - The background color string (CSS-compatible).
 * @returns 'white' or 'black' depending on contrast ratio.
 */
export const fcc = (color: string) => {
  const white = Color('white');
  const _color = Color(color).contrast(white);
  return _color > 2 ? 'white' : 'black';
};
