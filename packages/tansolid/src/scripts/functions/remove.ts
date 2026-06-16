import { getFile } from '../helpers';
import type { Options } from './add';

const toArray = (files?: string | string[]): string[] => {
  if (!files) return [];
  return Array.isArray(files) ? files : [files];
};

import { remove as _remove } from '@bemedev/codebase';

export const remove = (options: Options = {}) => {
  const { CODEBASE_ANALYSIS } = getFile();
  const files = toArray(options.files);

  return _remove(CODEBASE_ANALYSIS, ...files);
};
