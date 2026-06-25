import type { LanguageOption } from './LangSwitcher.types';

export const DEFAULT_LANG = {
  value: 'en',
  label: 'English',
  flag: '🇺🇸',
} as const satisfies LanguageOption;
