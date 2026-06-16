import { command } from 'cmd-ts';
import { destroy as handler } from '../functions/destroy';

export const destroy = command({
  name: 'destroy',
  args: {},
  handler,
});
