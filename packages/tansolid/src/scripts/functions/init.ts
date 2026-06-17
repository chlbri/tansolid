import { CLI_NAME, JSON_PATH } from '#config';
import { init as _init, type InitOptions } from '@bemedev/codebase';
import { getCodebase } from '../helpers';
import { add } from './add';

export const init = (options: Partial<InitOptions> = {}) => {
  const { root = CLI_NAME, json = JSON_PATH } = options;
  const CODEBASE_ANALYSIS = getCodebase();

  _init(CODEBASE_ANALYSIS, {
    root,
    json,
    path: '#tansolid/*',
    bin: 'tansolid',
  });

  return add({ files: ['constants', 'types/index'] });
};
