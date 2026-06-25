/** @jsxImportSource solid-js */
import { cn } from '#cn';
import type { PolymorphicProps } from '@kobalte/core/polymorphic';
import * as Sel from '@kobalte/core/select';
import type { ParentProps, ValidComponent } from 'solid-js';
import { splitProps } from 'solid-js';

export const Select = <
  Option,
  OptGroup = never,
  T extends ValidComponent = 'div',
>(
  props: PolymorphicProps<T, Sel.SelectRootProps<Option, OptGroup, T>>,
) => Sel.Select(props);

Select.Arrow = Sel.Select.Arrow;

// #region Content
type _SelectContentProps<T extends ValidComponent = 'div'> =
  Sel.SelectContentProps<T> & {
    class?: string;
  };

Select.Content = <T extends ValidComponent = 'div'>(
  props: PolymorphicProps<T, _SelectContentProps<T>>,
) => {
  const [local, rest] = splitProps(props as _SelectContentProps, [
    'class',
  ]);

  return (
    <Sel.Select.Portal>
      <Sel.Select.Content
        class={cn(
          'relative z-50 min-w-32 overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-expanded:animate-in data-closed:animate-out data-closed:fade-out-0 data-expanded:fade-in-0 data-closed:zoom-out-95 data-expanded:zoom-in-95',
          local.class,
        )}
        {...rest}
      >
        <Sel.Select.Listbox class='p-1 focus-visible:outline-none' />
      </Sel.Select.Content>
    </Sel.Select.Portal>
  );
};

// #endregion

Select.Description = Sel.Select.Description;
Select.ErrorMessage = Sel.Select.ErrorMessage;
Select.HiddenSelect = Sel.Select.HiddenSelect;
Select.Icon = Sel.Select.Icon;

// #region Item
type _SelectItemProps<T extends ValidComponent = 'li'> = ParentProps<
  Sel.SelectItemProps<T> & { class?: string }
>;

Select.Item = <T extends ValidComponent = 'li'>(
  props: PolymorphicProps<T, _SelectItemProps<T>>,
) => {
  const [local, rest] = splitProps(props as _SelectItemProps, [
    'class',
    'children',
  ]);

  return (
    <Sel.Select.Item
      class={cn(
        'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50',
        local.class,
      )}
      {...rest}
    >
      <Sel.Select.ItemIndicator class='absolute right-2 flex h-3.5 w-3.5 items-center justify-center'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          class='h-4 w-4'
          viewBox='0 0 24 24'
        >
          <path
            fill='none'
            stroke='currentColor'
            stroke-linecap='round'
            stroke-linejoin='round'
            stroke-width='2'
            d='m5 12l5 5L20 7'
          />
          <title>Checked</title>
        </svg>
      </Sel.Select.ItemIndicator>
      <Sel.Select.ItemLabel>{local.children}</Sel.Select.ItemLabel>
    </Sel.Select.Item>
  );
};
// #endregion

Select.ItemDescription = Sel.Select.ItemDescription;
Select.ItemIndicator = Sel.Select.ItemIndicator;
Select.ItemLabel = Sel.Select.ItemLabel;
Select.Label = Sel.Select.Label;
Select.Listbox = Sel.Select.Listbox;
Select.Portal = Sel.Select.Portal;
Select.Section = Sel.Select.Section;

// #region Trigger
type _SelectTriggerProps<T extends ValidComponent = 'button'> =
  ParentProps<Sel.SelectTriggerProps<T> & { class?: string }>;

Select.Trigger = <T extends ValidComponent = 'button'>(
  props: PolymorphicProps<T, _SelectTriggerProps<T>>,
) => {
  const [local, rest] = splitProps(props as _SelectTriggerProps, [
    'class',
    'children',
  ]);

  return (
    <Sel.Select.Trigger
      class={cn(
        'flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background transition-shadow placeholder:text-muted-foreground focus:outline-none focus-visible:ring-[1.5px] focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
        local.class,
      )}
      {...rest}
    >
      {local.children}
      <Sel.Select.Icon
        as='svg'
        xmlns='http://www.w3.org/2000/svg'
        width='1em'
        height='1em'
        viewBox='0 0 24 24'
        class='flex size-4 items-center justify-center opacity-50'
      >
        <path
          fill='none'
          stroke='currentColor'
          stroke-linecap='round'
          stroke-linejoin='round'
          stroke-width='2'
          d='m8 9l4-4l4 4m0 6l-4 4l-4-4'
        />
      </Sel.Select.Icon>
    </Sel.Select.Trigger>
  );
};
// #endregion

Select.Value = Sel.Select.Value;
