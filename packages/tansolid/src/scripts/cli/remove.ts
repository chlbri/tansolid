import { command, restPositionals } from 'cmd-ts';
import { remove as handler } from '../functions/remove';

export const remove = command({
  args: {
    files: restPositionals({
      displayName: 'files',
      description: 'Files to remove from the codebase analysis',
    }),
  },

  name: 'remove',
  description: 'Removes files from the codebase analysis.',
  handler,
});
