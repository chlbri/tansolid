import { command, restPositionals } from 'cmd-ts';
import { add as handler } from '../functions/add';

export const add = command({
  name: 'add',
  args: {
    files: restPositionals({
      displayName: 'files',
      description: 'Files to add to the codebase analysis',
    }),
  },
  handler,
});
