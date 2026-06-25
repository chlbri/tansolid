import { subcommands } from 'cmd-ts';
import { add } from './add';
import { destroy } from './destroy';
import { init } from './init';
import { remove } from './remove';
import { CLI_NAME } from '#config';
import { install } from './install';
import { uninstall } from './uninstall';

export const cli = subcommands({
  name: CLI_NAME,
  description:
    'CLI adding Solid JS utilities from the lib "@bemedev/tansolid"',

  cmds: {
    install,
    uninstall,
    add,
    init,
    remove,
    destroy,
  },
});
