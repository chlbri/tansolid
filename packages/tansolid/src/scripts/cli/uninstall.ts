import { command } from 'cmd-ts';
import { uninstall as handler } from '../functions/uninstall';

export const uninstall = command({
  name: 'uninstall',
  args: {},
  description: 'Uninstalls the codebase configuration.',
  handler,
});
