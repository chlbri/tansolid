import { onCleanup } from 'solid-js';

/**
 * SolidJS custom directive that triggers a callback when clicking outside the target element.
 * @param el - The target HTML element.
 * @param accessor - Accessor returning the callback function to run on outside clicks.
 */
export const clickOutside = (
  el: HTMLElement,
  accessor: () => (...args: any[]) => void,
) => {
  const onClick = (e: MouseEvent) => {
    // Check if the clicked element is outside the tracked element
    if (!el.contains(e.target as Node)) accessor()?.();
  };

  // Add the event listener to the document body
  document.body.addEventListener('click', onClick);

  // Clean up the event listener when the element is removed from the DOM
  onCleanup(() => document.body.removeEventListener('click', onClick));
};
