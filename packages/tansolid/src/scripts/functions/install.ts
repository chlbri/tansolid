import { consoleStars } from '@bemedev/codebase';
import { execSync } from 'child_process';
import { installCommand, PACKAGES } from './helpers';

export const install = () => {
  consoleStars();
  console.log('Installing dependencies...');
  const command = installCommand();
  execSync(command, { stdio: 'inherit' });
  console.log('Dependencies installed successfully! 📦');
  console.log(PACKAGES);
  consoleStars();
  console.log();
};
