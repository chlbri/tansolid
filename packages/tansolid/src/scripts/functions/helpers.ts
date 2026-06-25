import { existsSync } from 'fs';
import { join } from 'path';

export const getPackageManager = (): 'pnpm' | 'yarn' | 'bun' | 'npm' => {
  const userAgent = process.env.npm_config_user_agent || '';
  if (userAgent.includes('pnpm')) return 'pnpm';
  if (userAgent.includes('yarn')) return 'yarn';
  if (userAgent.includes('bun')) return 'bun';
  if (userAgent.includes('npm')) return 'npm';

  const cwd = process.cwd();
  if (existsSync(join(cwd, 'pnpm-lock.yaml'))) return 'pnpm';
  if (existsSync(join(cwd, 'yarn.lock'))) return 'yarn';

  if (
    existsSync(join(cwd, 'bun.lock')) ||
    existsSync(join(cwd, 'bun.lockb'))
  ) {
    return 'bun';
  }

  if (existsSync(join(cwd, 'package-lock.json'))) return 'npm';

  return 'npm';
};

export const PACKAGES = ['lucide-solid', '@kobalte/core'];

export const installCommand = () => {
  let command = '';

  switch (getPackageManager()) {
    case 'pnpm':
      command += 'pnpm add';
      break;
    case 'yarn':
      command += 'yarn add';
      break;
    case 'bun':
      command += 'bun add';
      break;
    default:
      command += 'npm install';
  }

  command += ' ';
  command += PACKAGES.join(' ');

  return command;
};

export const uninstallCommand = () => {
  let command = '';

  switch (getPackageManager()) {
    case 'pnpm':
      command += 'pnpm remove';
      break;
    case 'yarn':
      command += 'yarn remove';
      break;
    case 'bun':
      command += 'bun remove';
      break;
    default:
      command += 'npm uninstall';
  }

  command += ' ';
  command += PACKAGES.join(' ');

  return command;
};
