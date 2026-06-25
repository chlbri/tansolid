import { CLI_NAME, JSON_PATH } from '../constants';
import { command, option, string } from 'cmd-ts';
import { init as handler } from '../functions/init';

export const init = command({
  args: {
    json: option({
      long: 'json',
      short: 'j',
      env: 'BEMEDEV_JSON_PATH',
      description: 'Path to the config.json file',
      type: string,
      defaultValue: () => JSON_PATH,
    }),
    root: option({
      long: 'root',
      short: 'r',
      env: 'BEMEDEV_ROOT',
      description: 'Root directory to store the analysis files',
      type: string,
      defaultValue: () => CLI_NAME,
    }),
  },

  name: 'init',
  description: 'Initializes the codebase configuration.',
  handler,
});
