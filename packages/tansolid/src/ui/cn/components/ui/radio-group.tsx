import { cn } from '~cn/utils';
import type { PolymorphicProps } from '@kobalte/core/polymorphic';
import type { RadioGroupItemControlProps } from '@kobalte/core/radio-group';
import { RadioGroup as RadioGroupPrimitive } from '@kobalte/core/radio-group';
import type { ValidComponent, VoidProps } from 'solid-js';
import { splitProps } from 'solid-js';

/** Description sub-component for the RadioGroup. */
export const RadioGroupDescription = RadioGroupPrimitive.Description;

/** Error message sub-component for the RadioGroup validation. */
export const RadioGroupErrorMessage = RadioGroupPrimitive.ErrorMessage;

/** Description sub-component for a specific RadioGroup Item. */
export const RadioGroupItemDescription =
  RadioGroupPrimitive.ItemDescription;

/** Hidden raw input sub-component inside a RadioGroup Item. */
export const RadioGroupItemInput = RadioGroupPrimitive.ItemInput;

/** Text label sub-component for a specific RadioGroup Item. */
export const RadioGroupItemLabel = RadioGroupPrimitive.ItemLabel;

/** Text label sub-component for the root RadioGroup. */
export const RadioGroupLabel = RadioGroupPrimitive.Label;

/** Root RadioGroup container component. */
export const RadioGroup = RadioGroupPrimitive;

/** Single option item component inside a RadioGroup. */
export const RadioGroupItem = RadioGroupPrimitive.Item;

type radioGroupItemControlProps<T extends ValidComponent = 'div'> =
  VoidProps<RadioGroupItemControlProps<T> & { class?: string }>;

/**
 * Interactive indicator checkbox/dot control container for the RadioGroup Item.
 */
export const RadioGroupItemControl = <T extends ValidComponent = 'div'>(
  props: PolymorphicProps<T, radioGroupItemControlProps<T>>,
) => {
  const [local, rest] = splitProps(props as radioGroupItemControlProps, [
    'class',
  ]);

  return (
    <RadioGroupPrimitive.ItemControl
      class={cn(
        'flex aspect-square h-4 w-4 items-center justify-center rounded-full border border-primary text-primary shadow transition-shadow focus:outline-none focus-visible:ring-[1.5px] focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-checked:bg-gray-300',
        local.class,
      )}
      {...rest}
    >
      <RadioGroupPrimitive.ItemIndicator class='h-2 w-2 rounded-full data-checked:bg-gray-50' />
    </RadioGroupPrimitive.ItemControl>
  );
};
