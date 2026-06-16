import code from '#codebase';
import { CodeAnalysisFileSchema } from '@bemedev/codebase';
import { parse } from 'valibot';

export const getFile = () => parse(CodeAnalysisFileSchema, code);
export const getCodebase = () => getFile().CODEBASE_ANALYSIS;

export const toArray = (files?: string | string[]): string[] => {
  if (!files) return [];
  return Array.isArray(files) ? files : [files];
};
