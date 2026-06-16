import { type Component } from 'solid-js';
import { cn } from '../cn/utils';
import { useHook } from './Tooltip.hook';
import type { ToolTipProps } from './Tooltip.types';

/**
 * ToolTip component that displays a tooltip overlay on hover, focus, or custom interaction.
 * @param props - Tooltip properties including tooltip content, placement preference, and trigger delays.
 * @returns The rendered tooltipped component container.
 */
export const ToolTip: Component<ToolTipProps> = props => {
  const { isVisible, positionClass, setContainerRef, handlers, local } =
    useHook(props);

  return (
    <div
      {...local}
      ref={setContainerRef}
      class={cn('relative', local.class)}
      {...handlers}
    >
      {props.children}
      <div
        class={cn(
          'absolute z-50 px-2 py-1 text-sm text-white bg-black rounded-md shadow-lg whitespace-nowrap transition-opacity duration-200',
          positionClass(),
          isVisible()
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none',
        )}
      >
        {props.tooltip}
      </div>
    </div>
  );
};
