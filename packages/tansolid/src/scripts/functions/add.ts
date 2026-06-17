import { add as _add } from '@bemedev/codebase';
import { getFile, toArray } from '../helpers';
import { JSON_PATH } from '#config';

export type Options = {
  files?: string | string[];
};

export const add = (options: Options = {}) => {
  const { CODEBASE_ANALYSIS } = getFile();
  const files = toArray(options.files);
  console.log('Adding files:', files);
  return _add(CODEBASE_ANALYSIS, JSON_PATH, ...files);
};
