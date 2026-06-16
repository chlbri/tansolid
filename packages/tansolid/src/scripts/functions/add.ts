import edit, { type JsonEditor } from 'edit-json-file';
import { dirname, join, relative, resolve } from 'node:path';
import {
  consoleStars,
  getFolderPath,
  transformModule,
  writeFileAnalysis,
  getFile,
} from '../helpers';
import type { CodebaseAnalysis, FileAnalysis } from '@bemedev/codebase';

type NOmit<T, K extends keyof T> = Omit<T, K>;

const processFileAnalysis = (
  analysis: NOmit<FileAnalysis, 'exports'>,
  cwd: string,
  additionals: [string, NOmit<FileAnalysis, 'exports'>][],
  pathsEntries: [string, NOmit<FileAnalysis, 'exports'>][],
  files: string[],
  CODEBASE_ANALYSIS: CodebaseAnalysis,
) => {
  const relativePath = analysis.relativePath;

  const keys = Object.keys(CODEBASE_ANALYSIS);
  analysis.imports.forEach(({ moduleSpecifier }) => {
    const _path = relative(
      cwd,
      resolve(dirname(relativePath), moduleSpecifier),
    ).replaceAll('/', '.');

    const all = additionals
      .concat(pathsEntries)
      .map(([key]) => key)
      .concat(files);

    const canAdd = all.every(p => p !== _path);
    if (!canAdd) return;

    const toAdd =
      CODEBASE_ANALYSIS[_path] ?? CODEBASE_ANALYSIS[`${_path}.index`];
    if (!toAdd) return;

    additionals.push([_path, toAdd]);
    all.push(_path);

    const imports = toAdd.imports.filter(({ moduleSpecifier }) => {
      const _path = transformModule({
        cwd,
        relativePath: toAdd.relativePath,
        moduleSpecifier,
      });

      const array = [_path, `${_path}.index`].filter(p =>
        keys.includes(p),
      );

      if (array.length < 1) return false;

      return array.every(p => !all.includes(p));
    });

    const toAdd2 = { ...toAdd, imports };
    const canRecurse = toAdd2.imports.length > 0;

    if (canRecurse) {
      processFileAnalysis(
        toAdd2,
        cwd,
        additionals,
        pathsEntries,
        files,
        CODEBASE_ANALYSIS,
      );
    }
  });
};

export type Options = {
  files?: string | string[];
};

const toArray = (files?: string | string[]): string[] => {
  if (!files) return [];
  return Array.isArray(files) ? files : [files];
};

export const add = (options: Options = {}) => {
  const { CODEBASE_ANALYSIS } = getFile();
  const filesInput = toArray(options.files);
  console.log('Adding files:', filesInput);

  const isEmpty = filesInput.length === 0;
  if (isEmpty) return console.warn('No files specified for addition.');
  try {
    const cwd = process.cwd();
    const json = join(cwd, '.bemedev.json');
    let file: JsonEditor | undefined = edit(json);

    if (!file) return;

    const files = file.get('files') as string[];
    const root = getFolderPath(file.get('path') as string);

    const additionals: [string, NOmit<FileAnalysis, 'exports'>][] = [];

    const pathsEntries = Object.entries(CODEBASE_ANALYSIS)
      .filter(([key]) => filesInput.some(p => key.startsWith(p)))
      .filter(([key]) => !files.includes(key));

    pathsEntries.forEach(([, analysis]) => {
      processFileAnalysis(
        analysis,
        cwd,
        additionals,
        pathsEntries,
        files,
        CODEBASE_ANALYSIS,
      );
    });

    const entries = new Set(
      pathsEntries.concat(additionals).filter(([, val]) => !!val),
    );

    consoleStars();
    console.log(`🔧 Création des fichiers (${entries.size} fichiers)...`);

    let success = 0;
    const length = entries.size;

    entries.forEach(([, fileAnalysis]) => {
      const _path = writeFileAnalysis(fileAnalysis, root);
      if (_path) {
        files.push(_path);
        file?.set('files', files);
        success++;
      }
    });

    file.save();
    console.log(`✅ Fichiers créés! (${success}/${length})`);
    file = undefined;
  } catch (err) {
    console.error(`❌ Erreur lors de la création des fichiers:`, err);
    return false;
  }

  consoleStars();
  return true;
};
