import { splitProps } from 'solid-js';
import type { OmitPropsOf } from '../../types';
import { cn } from '../cn/utils';

/**
 * Properties for the MultiText component.
 */
type Props<T extends string[]> = {
  /** Array of text snippets to display inside individual span tags. */
  texts: T;
  /** Custom options/props for each individual text span index. */
  props?: {
    [K in Extract<keyof T, `${number}`>]?: OmitPropsOf<'span', 'children'>;
  };
} & OmitPropsOf<'span', 'children'>;

/**
 * Renders multiple inline span elements sequentially, wrapping them in a single parent span.
 * @param props - Configuration properties containing the texts, inner span properties, and outer span wrapper styling.
 * @returns The rendered JSX element.
 */
export const MultiText = <const T extends string[]>({
  texts,
  props: _props,
  ...rest
}: Props<T>) => {
  const [local, all] = splitProps(rest, ['class']);

  return (
    <span {...all} class={cn('inline!', local.class)}>
      {texts.map((text, index) => {
        const props = { ...(_props as any)?.[index] };
        return <span {...props}>{text}</span>;
      })}
    </span>
  );
};
