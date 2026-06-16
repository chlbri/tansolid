import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { parse } from 'valibot';
import {
  CodeAnalysisFileSchema,
  type FileAnalysis,
} from '@bemedev/codebase';
import code from '#codebase';

export const getFile = () => parse(CodeAnalysisFileSchema, code);
export const getCodebase = () => getFile().CODEBASE_ANALYSIS;

export function pathToDotNotation(filePath: string): string {
  return filePath
    .replace(/\.(ts|tsx)$/, '') // Strip both .ts and .tsx
    .replace(/\//g, '.');
}

export type TransformModuleArgs = {
  cwd?: string;
  relativePath: string;
  moduleSpecifier: string;
};

export const transformModule = ({
  cwd = process.cwd(),
  relativePath,
  moduleSpecifier,
}: TransformModuleArgs) => {
  const out = relative(
    cwd,
    resolve(dirname(relativePath), moduleSpecifier),
  ).replaceAll('/', '.');

  return out;
};

const REPLACERS_INIT = [
  ['-|||-w', '`'],
  ['-|||-s', '\\s'],
  ['-|||-d', '\\d'],
  ['$-|||-{', '${'],
] as const;

export const writeFileAnalysis = (
  fileAnalysis: FileAnalysis,
  folderPath: string,
) => {
  const relativePath = fileAnalysis.relativePath;
  const destPath = join(folderPath, relativePath);
  const destDir = dirname(destPath);

  try {
    mkdirSync(destDir, { recursive: true });

    let fileContent = fileAnalysis.text;
    REPLACERS_INIT.forEach(([search, replace]) => {
      fileContent = fileContent.replaceAll(search, replace);
    });

    writeFileSync(destPath, fileContent, 'utf8');
    console.log(`  ✅ ${relativePath}`);

    return relativePath.replace(/\.(ts|tsx)$/, '').replaceAll('/', '.');
  } catch (error) {
    console.error(`  ❌ Erreur pour ${relativePath}:`, error);
    return undefined;
  }
};

export const consoleStars = () => {
  console.log();
  console.log('*'.repeat(30));
  console.log();
};

export const getFolderPath = (root: string) => {
  const cwd = process.cwd();
  const srcExists = existsSync(join(cwd, 'src'));
  const folderPath = srcExists ? join(cwd, 'src', root) : join(cwd, root);

  return folderPath;
};
