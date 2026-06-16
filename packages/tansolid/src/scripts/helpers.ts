import code from '#codebase';
import { CodeAnalysisFileSchema } from '@bemedev/codebase';
import { existsSync } from 'fs';
import { join } from 'path';
import { parse } from 'valibot';

export const getFile = () => parse(CodeAnalysisFileSchema, code);
export const getCodebase = () => getFile().CODEBASE_ANALYSIS;

export const toArray = (files?: string | string[]): string[] => {
  if (!files) return [];
  return Array.isArray(files) ? files : [files];
};

export const getFolderPath = (root: string) => {
  const cwd = process.cwd();
  const srcExists = existsSync(join(cwd, 'src'));
  const folderPath = srcExists ? join(cwd, 'src', root) : join(cwd, root);

  return folderPath;
};
