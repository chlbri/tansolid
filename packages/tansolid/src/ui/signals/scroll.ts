import { createSignal } from 'solid-js';

/**
 * Creates scroll controllers (scrollY, scrollX) linked to a target DOM element via ref.
 * @param behavior - The scroll behavior (e.g. 'smooth', 'auto'). Defaults to 'smooth'.
 * @returns An object containing setRef, scrollY, and scrollX functions.
 */
export const createScroll = (
  behavior: ScrollOptions['behavior'] = 'smooth',
) => {
  const [ref, setRef] = createSignal<HTMLDivElement>();

  // Example of a button to manually trigger the scroll
  const scrollY = (percent = 0) => {
    const _ref = ref();
    if (_ref) {
      const top = (_ref.scrollHeight * percent) / 100;
      _ref.scrollTo({ top, behavior });
    }
  };

  const scrollX = (percent = 0) => {
    const _ref = ref();
    if (_ref) {
      const left = (_ref.scrollWidth * percent) / 100;
      _ref.scrollTo({ left, behavior });
    }
  };

  return { setRef, scrollY, scrollX };
};
