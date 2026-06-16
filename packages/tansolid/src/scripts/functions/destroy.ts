import { config } from '#config';
import { getFolderPath } from '@bemedev/codebase/lib/helpers.js';
import edit, { type JsonEditor } from 'edit-json-file';
import { rmSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Supprime un fichier JSON ou un dossier de façon récursive.
 */
export function destroy() {
  const cwd = process.cwd();
  const jsonPath = join(cwd, config.json);
  let file: JsonEditor | undefined = edit(jsonPath);
  const root = file?.get('path') as string | undefined;
  if (root) {
    const fullPath = getFolderPath(root);
    try {
      rmSync(fullPath, { recursive: true, force: true });
      console.log(`Folder ("${root}") has been removed.`);
    } catch {
      console.error(`Error while removing the folder ("${root}").`);
    }
  }

  file = undefined;
  try {
    rmSync(jsonPath, { force: true });
    console.log(`Configuration file ("${config.json}") has been removed.`);
  } catch {
    console.error(
      `Error while removing the configuration file ("${config.json}").`,
    );
  }
}
