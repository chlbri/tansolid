import { init as _init, type InitOptions } from '@bemedev/codebase';
import {
  DEFAULT_ROOT,
  JSON_PATH,
  config as localConfig,
} from '../constants';
import { getCodebase } from '../helpers';
import { add } from './add';

export const init = (options: Partial<InitOptions> = {}) => {
  const { root = DEFAULT_ROOT, json = JSON_PATH } = options;
  const CODEBASE_ANALYSIS = getCodebase();
  localConfig.json = json;
  _init(CODEBASE_ANALYSIS, { root, json });

  return add({ files: 'constants' });
};
