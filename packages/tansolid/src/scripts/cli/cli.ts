import { subcommands } from 'cmd-ts';
import { add } from './add';
import { destroy } from './destroy';
import { init } from './init';
import { remove } from './remove';

export const cli = subcommands({
  name: 'bemedev',
  cmds: {
    add,
    init,
    remove,
    destroy,
  },
});
