import { command, restPositionals } from 'cmd-ts';
import { add as handler } from '../functions/add';

export const add = command({
  args: {
    files: restPositionals({
      displayName: 'files',
      description: 'Files to add to the codebase analysis',
    }),
  },

  name: 'add',
  description: 'Adds files to the codebase analysis.',
  handler,
});
