import { subcommands } from 'cmd-ts';
import { add } from './add';
import { destroy } from './destroy';
import { init } from './init';
import { remove } from './remove';
import { CLI_NAME } from '#config';

export const cli = subcommands({
  name: CLI_NAME,
  cmds: {
    add,
    init,
    remove,
    destroy,
  },
});
