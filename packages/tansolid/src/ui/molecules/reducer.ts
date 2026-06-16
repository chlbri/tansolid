import { type Component, type ComponentProps } from 'solid-js';
import type { RC } from '../../types';

/**
 * Reduces a component by pre-applying a set of default properties.
 * @template T - The original component type.
 * @template K - The type of props to pre-apply.
 * @template Keys - The keys of the pre-applied props.
 * @param Compt - The component to reduce.
 * @param props1 - The default props to pre-apply.
 * @returns The reduced component with pre-applied props made optional.
 */
export const reduceComponent = <
  const T extends Component<any>,
  K extends Partial<ComponentProps<T>> = never,
  Keys extends keyof ComponentProps<T> =
    keyof K extends keyof ComponentProps<T> ? keyof K : never,
>(
  Compt: T,
  props1?: K,
) => {
  const out: RC<T, Keys> = props2 => {
    const props = { ...props1, ...props2 };
    return Compt(props);
  };

  return out;
};
