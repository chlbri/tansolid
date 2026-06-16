import type {
  Component,
  ComponentProps,
  JSX,
  ValidComponent,
} from 'solid-js';

/**
 * Represents a generic function type.
 * @template Args - The tuple type of the function arguments.
 * @template R - The return type of the function.
 */
export type Fn<Args extends any[] = any[], R = any> = (...args: Args) => R;

/**
 * Extracts a subset of props from a valid SolidJS component.
 * @template T - The SolidJS valid component type.
 * @template K - The keys of the component props to pick.
 */
export type PropsOf<
  T extends ValidComponent,
  K extends keyof ComponentProps<T> = never,
> = Pick<ComponentProps<T>, K>;

/**
 * Omits a subset of props from a valid SolidJS component.
 * @template T - The SolidJS valid component type.
 * @template K - The keys of the component props to omit.
 */
export type OmitPropsOf<
  T extends ValidComponent,
  K extends keyof ComponentProps<T> = never,
> = Omit<ComponentProps<T>, K>;

/**
 * Creates a component type where a subset of its props are made optional.
 * @template T - The SolidJS valid component type.
 * @template K - The keys of the component props to make optional.
 */
export type ReduceComponent<
  T extends ValidComponent,
  K extends keyof ComponentProps<T> = never,
> = Component<OmitPropsOf<T, K> & Partial<PropsOf<T, K>>>;

/**
 * Short alias for {@link ReduceComponent}.
 * @template T - The SolidJS valid component type.
 * @template K - The keys of the component props to make optional.
 */
export type RC<
  T extends ValidComponent,
  K extends keyof ComponentProps<T> = never,
> = ReduceComponent<T, K>;

/**
 * Creates a component type containing only a picked subset of props from another component.
 * @template T - The SolidJS valid component type.
 * @template K - The keys of the component props to pick.
 */
export type PickComponent<
  T extends ValidComponent,
  K extends keyof ComponentProps<T> = never,
> = Component<PropsOf<T, K>>;

/**
 * Short alias for {@link PickComponent}.
 * @template T - The SolidJS valid component type.
 * @template K - The keys of the component props to pick.
 */
export type PiC<
  T extends ValidComponent,
  K extends keyof ComponentProps<T> = never,
> = PickComponent<T, K>;

/**
 * Represents the attributes of a standard HTML link tag.
 */
export type RootLink = JSX.HTMLElementTags['link'];
