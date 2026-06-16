import contentCollections from '@content-collections/vite';
import tailwindcss from '@tailwindcss/vite';
import { tanstackStart } from '@tanstack/solid-start/plugin/vite';
import { nitro } from 'nitro/vite';
import { defineConfig } from 'vite';
import viteSolid from 'vite-plugin-solid';

export default defineConfig({
  server: {
    port: 3000,
  },
  resolve: {
    tsconfigPaths: true,
  },

  plugins: [
    tailwindcss(),
    contentCollections({}),
    tanstackStart({}),
    nitro(),
    viteSolid({ ssr: true }),
  ],
});
