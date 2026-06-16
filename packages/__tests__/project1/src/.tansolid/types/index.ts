import type { Component, ComponentProps, JSX, ValidComponent } from 'solid-js';

/**
 * Represents a generic function type.
 * @template Args - The tuple type of the function arguments.
 * @template R - The return type of the function.
 */
/**
 * Fn type - Auto-generated expression
 * 
 * ⚠️ WARNING: This expression is auto-generated and should not be modified.
 * Any manual changes will be overwritten during the next generation.
 * 
 * @generated
 * @readonly
 * @author chlbri (bri_lvi@icloud.com)
 */
export type Fn<Args extends any[] = any[], R = any> = (...args: Args) => R;

/**
 * Extracts a subset of props from a valid SolidJS component.
 * @template T - The SolidJS valid component type.
 * @template K - The keys of the component props to pick.
 */
/**
 * PropsOf type - Auto-generated expression
 * 
 * ⚠️ WARNING: This expression is auto-generated and should not be modified.
 * Any manual changes will be overwritten during the next generation.
 * 
 * @generated
 * @readonly
 * @author chlbri (bri_lvi@icloud.com)
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
/**
 * OmitPropsOf type - Auto-generated expression
 * 
 * ⚠️ WARNING: This expression is auto-generated and should not be modified.
 * Any manual changes will be overwritten during the next generation.
 * 
 * @generated
 * @readonly
 * @author chlbri (bri_lvi@icloud.com)
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
/**
 * ReduceComponent type - Auto-generated expression
 * 
 * ⚠️ WARNING: This expression is auto-generated and should not be modified.
 * Any manual changes will be overwritten during the next generation.
 * 
 * @generated
 * @readonly
 * @author chlbri (bri_lvi@icloud.com)
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
/**
 * RC type - Auto-generated expression
 * 
 * ⚠️ WARNING: This expression is auto-generated and should not be modified.
 * Any manual changes will be overwritten during the next generation.
 * 
 * @generated
 * @readonly
 * @author chlbri (bri_lvi@icloud.com)
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
/**
 * PickComponent type - Auto-generated expression
 * 
 * ⚠️ WARNING: This expression is auto-generated and should not be modified.
 * Any manual changes will be overwritten during the next generation.
 * 
 * @generated
 * @readonly
 * @author chlbri (bri_lvi@icloud.com)
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
/**
 * PiC type - Auto-generated expression
 * 
 * ⚠️ WARNING: This expression is auto-generated and should not be modified.
 * Any manual changes will be overwritten during the next generation.
 * 
 * @generated
 * @readonly
 * @author chlbri (bri_lvi@icloud.com)
 */
export type PiC<
  T extends ValidComponent,
  K extends keyof ComponentProps<T> = never,
> = PickComponent<T, K>;

/**
 * Represents the attributes of a standard HTML link tag.
 */
/**
 * RootLink type - Auto-generated expression
 * 
 * ⚠️ WARNING: This expression is auto-generated and should not be modified.
 * Any manual changes will be overwritten during the next generation.
 * 
 * @generated
 * @readonly
 * @author chlbri (bri_lvi@icloud.com)
 */
export type RootLink = JSX.HTMLElementTags['link'];

    