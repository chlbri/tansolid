import { consoleStars } from '@bemedev/codebase';
import { execSync } from 'node:child_process';
import { uninstallCommand, PACKAGES } from './helpers';

export const uninstall = () => {
  consoleStars();
  console.log('Removing dependencies...');
  const command = uninstallCommand();
  execSync(command, { stdio: 'inherit' });
  console.log('Dependencies removed successfully! 📦');
  console.log(PACKAGES);
  consoleStars();
  console.log();
};
