import { NON_BREAKABLE_SPACE, VISIBLE_ESPACE } from '../constants';

/**
 * Returns a zero-width space if the input string is empty, otherwise returns the input string.
 * @param newText - The input text to check.
 * @returns The original string or VISIBLE_ESPACE if empty.
 */
export const espace = (newText: string) => {
  if (newText === '') {
    return VISIBLE_ESPACE;
  }
  return newText;
};

/**
 * Generates a repeated sequence of non-breaking spaces.
 * @param count - The number of times to repeat the space. Defaults to 1.
 * @returns The repeated non-breaking space string.
 */
export const repeatSpace = (count = 1) => {
  return NON_BREAKABLE_SPACE.repeat(count);
};
