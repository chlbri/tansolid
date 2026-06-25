import { command } from 'cmd-ts';
import { install as handler } from '../functions/install';

export const install = command({
  name: 'install',
  args: {},
  description: 'Installs the codebase configuration.',
  handler,
});
