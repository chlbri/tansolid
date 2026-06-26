import type { Component } from 'solid-js';
import { DEFAULT_LANG } from './LangSwitcher.constants';
import type { LanguageOption } from './LangSwitcher.types';
import { Select } from './Select';

type Props = {
  langs?: LanguageOption[];
  defaultLang?: string;
  onChange?: (option: LanguageOption) => void;
  placeholder?: string;
};

export const LangSwitcher: Component<Props> = ({
  langs = [],
  defaultLang,
  onChange,
  placeholder,
}) => {
  const selected =
    langs.find(l => l.value === defaultLang) ?? langs[0] ?? DEFAULT_LANG;

  return (
    <div class='relative w-full'>
      <Select<LanguageOption>
        defaultValue={selected}
        options={langs}
        optionValue='value'
        optionTextValue='label'
        placeholder={placeholder}
        onChange={option => {
          if (option) onChange?.(option);
        }}
        itemComponent={itemProps => (
          <Select.Item
            item={itemProps.item}
            class='flex items-center justify-between px-3 py-2 text-sm text-sidebar-foreground rounded-lg cursor-pointer outline-none select-none hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 data-focus:bg-sidebar-accent data-focus:text-sidebar-accent-foreground transition-all duration-150'
          >
            <div class='flex items-center gap-2.5'>
              <span class='text-base leading-none select-none'>
                {itemProps.item.rawValue.flag}
              </span>
              <Select.ItemLabel class='font-medium'>
                {itemProps.item.rawValue.label}
              </Select.ItemLabel>
            </div>
          </Select.Item>
        )}
      >
        <Select.Trigger class='flex items-center justify-between w-full px-3.5 py-2.5 text-sm font-medium transition-all duration-300 border rounded-xl bg-sidebar-accent/20 hover:bg-sidebar-accent/50 border-sidebar-border hover:border-sidebar-foreground/20 focus:outline-none focus-visible:ring-1 focus-visible:ring-sidebar-ring disabled:cursor-not-allowed disabled:opacity-50 gap-2.5 text-sidebar-foreground/80 hover:text-sidebar-foreground group'>
          <Select.Value<LanguageOption>>
            {state => {
              const selected = state.selectedOption();
              return (
                <div class='flex items-center gap-2.5'>
                  <span class='text-base leading-none select-none'>
                    {selected.flag}
                  </span>
                  <span class='font-semibold'>{selected.label}</span>
                </div>
              );
            }}
          </Select.Value>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content class='z-50 min-w-40 overflow-hidden rounded-xl border border-sidebar-border bg-sidebar/95 backdrop-blur-md p-1.5 text-sidebar-foreground shadow-2xl animate-in fade-in-80 slide-in-from-top-1 duration-200'>
            <Select.Listbox class='space-y-0.5 outline-none max-h-[300px] overflow-y-auto' />
          </Select.Content>
        </Select.Portal>
      </Select>
    </div>
  );
};

export default LangSwitcher;
