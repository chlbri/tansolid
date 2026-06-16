import { identity } from '@bemedev/pipe/extensions/common';
import { useRouter } from '@tanstack/solid-router';

type Filter = (value: string) => boolean;
type SearchFn = (to: string) => () => any;
type FormatFn = (to: string) => string;
type Args = {
  filter?: Filter;
  search?: SearchFn;
  formatLabel?: FormatFn;
};

/**
 * Formats a route path into a human-readable label.
 * @param to - The route path string.
 * @returns The formatted label string.
 */
export const formatLabel1 = (to: string) => {
  const step1 = to.charAt(1).toUpperCase() + to.slice(2);
  const out = step1 === '' ? 'Home' : step1;
  return out;
};

/**
 * Creates formatted navigation links for routes retrieved from the TanStack Router.
 * @param args - Options to filter, format labels, or build searches for the links.
 * @returns An array of route link descriptors.
 */
export const createLinks = (args?: Args) => {
  const { routesByPath } = useRouter();

  const flatRoutes = Object.keys(routesByPath);

  // #region Destructure maybe undefined object
  const {
    filter = () => true,
    search = () => () => undefined,
    formatLabel = identity,
  } = args ?? {};
  // #endregion

  return flatRoutes
    .sort((a, b) => {
      if (a === '/') return -1; // Home should be first
      return a.localeCompare(b);
    })
    .filter(filter)
    .map(to => ({
      to,
      children: formatLabel(to),
      search: search(to),
    }));
};
