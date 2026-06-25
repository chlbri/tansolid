import { defineConfig } from '@bemedev/dev-utils/rolldown';
import { esmExternalRequirePlugin } from 'rolldown/plugins';
import { readFileSync } from 'node:fs';

export default defineConfig.bemedev({
  declarationMap: true,
  sourcemap: true,
  plugins: [
    'alias',
    'tsPaths',
    'circulars',
    'externals',
    {
      name: 'export-json',
      load(id) {
        if (id.endsWith('.json')) {
          const content = readFileSync(id, 'utf8');
          return {
            // Wrap the raw JSON structure strictly as a default export
            code: `export default ${content};`,
            moduleType: 'js', // Override default 'json' type to prevent Rolldown's named exports
          };
        }
      },
    },
    esmExternalRequirePlugin(),
    'typescript',
    'clean',
    // json({ namedExports: false }),
  ],
});
