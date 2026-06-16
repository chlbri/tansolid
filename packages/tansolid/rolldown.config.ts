import { defineConfig } from '@bemedev/dev-utils/rolldown';

export default defineConfig.bemedev({
  declarationMap: true,
  ignoresJS: '**/*.example.ts',
  externals: [
    'solid-js',
    '@kobalte/core',
    '@tanstack/solid-router',
    'valibot',
    'clsx',
    'color',
    'tailwind-merge',
    '@bemedev/pipe',
  ],
}) as any;
