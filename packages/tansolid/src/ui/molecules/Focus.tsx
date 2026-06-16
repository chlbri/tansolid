import {
  createSignal,
  onMount,
  type Component,
  type ComponentProps,
  type ValidComponent,
} from 'solid-js';

/**
 * Callback function to check if the component should acquire focus.
 * @template T - The type of valid component.
 * @param props - The props of the component.
 * @returns Boolean indicating if focus should be set.
 */
type FocusFn<T extends ValidComponent> = (
  props: ComponentProps<T>,
) => boolean;

function _focus<T extends Component<any>>(children: T, focus: FocusFn<T>) {
  const Out = (props => {
    const [ref, setRef] = createSignal<HTMLElement | null>(null);

    onMount(() => {
      if (focus(props)) ref()?.focus();
    });

    const Compt = children;

    return <Compt {...props} ref={setRef} />;
  }) as T;

  return Out;
}

function _forwardFocus<T2 extends ValidComponent>(focus: FocusFn<T2>) {
  return <T extends ComponentProps<T2>>(Compt: Component<T>) =>
    _focus(Compt, focus as any);
}

/**
 * Creates a function that wraps a component to automatically focus it based on a condition.
 * @template T2 - The target component type.
 * @param focus - Function determining whether to focus the element.
 * @returns A HOC function wrapping the component.
 */
export function forwardFocus<T2 extends ValidComponent>(
  focus: FocusFn<T2>,
): <T extends ComponentProps<T2>>(Compt: Component<T>) => Component<T>;

/**
 * Wraps a component to automatically focus it when mounted based on a condition.
 * @template T2 - The target component type.
 * @param children - The component to wrap.
 * @param focus - Function determining whether to focus the element.
 * @returns The wrapped component.
 */
export function forwardFocus<T2 extends Component<any>>(
  children: T2,
  focus: FocusFn<T2>,
): T2;

/**
 * Implementation of forwardFocus supporting both direct component wrapping and curried HOC options.
 */
export function forwardFocus<T2 extends ValidComponent>(
  arg1: any,
  arg2?: FocusFn<T2>,
) {
  return arg2
    ? _focus(arg1 as any, arg2)
    : _forwardFocus(arg1 as FocusFn<T2>);
}
