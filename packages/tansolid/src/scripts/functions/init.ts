import { DEFAULT_ROOT, JSON_PATH, config as localConfig } from '#config';
import { init as _init, type InitOptions } from '@bemedev/codebase';
import { getCodebase } from '../helpers';
import { add } from './add';

export const init = (options: Partial<InitOptions> = {}) => {
  const { root = DEFAULT_ROOT, json = JSON_PATH } = options;
  const CODEBASE_ANALYSIS = getCodebase();
  localConfig.json = json;
  localConfig.root = root;

  _init(CODEBASE_ANALYSIS, {
    root,
    json,
    path: '#tansolid/*',
    bin: 'tansolid',
  });

  return add({ files: ['constants', 'types.index'] });
};
