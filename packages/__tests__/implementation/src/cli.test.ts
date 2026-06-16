import { $ } from 'zx';
import path from 'node:path';
import fs from 'node:fs';

const FOLDER = '.tansolid';
const JSON_PATH = '.tansolid.bemedev.json';

describe('CLI tests', () => {
  beforeAll(() => {
    const path_folder = path.join(process.cwd(), 'src', FOLDER);
    if (fs.existsSync(path_folder)) {
      fs.rmSync(path_folder, { recursive: true, force: true });
    }

    if (fs.existsSync(path.join(process.cwd(), JSON_PATH))) {
      fs.rmSync(path.join(process.cwd(), JSON_PATH));
    }
  });

  test('should display help', async () => {
    const result = await $`pnpm tansolid --help`;
    expect(result.stdout).toContain('tansolid');
  });

  test('should initialize config and folder structure', async () => {
    const tsconfigPath = path.join(process.cwd(), 'tsconfig.json');

    const result = await $`pnpm tansolid init`;
    console.log(result.stdout);
    expect(result.stdout).toContain(
      'Initialisation de bemedev terminée avec succès',
    );

    const hasTansolidDir = fs.existsSync(
      path.join(process.cwd(), 'src', FOLDER),
    );
    const hasTansolidJson = fs.existsSync(
      path.join(process.cwd(), JSON_PATH),
    );
    expect(hasTansolidDir).toBe(true);
    expect(hasTansolidJson).toBe(true);

    const tsconfigContent = JSON.parse(
      fs.readFileSync(tsconfigPath, 'utf8'),
    );
    expect(tsconfigContent.compilerOptions.paths).toBeDefined();
    expect(tsconfigContent.compilerOptions.paths['#bemedev/*']).toEqual([
      './src/.tansolid/*',
    ]);
  });

  test('should add a file to the codebase configuration', async () => {
    const sourceJson = path.join(JSON_PATH);

    const result =
      await $`pnpm tansolid add ui.molecules.Tooltip.constants`;
    expect(result.stdout).toContain(
      `Adding files: [ 'ui.molecules.Tooltip.constants' ]`,
    );

    const bemedevJsonContent = JSON.parse(
      fs.readFileSync(sourceJson, 'utf8'),
    );
    expect(bemedevJsonContent.files).toContain(
      'ui.molecules.Tooltip.constants',
    );
  });

  test.skip('should remove a file from the codebase configuration', async () => {
    const sourceJson = path.join('.tansolid.bemedev.json');
    const targetJson = path.join('.bemedev.json');
    fs.copyFileSync(sourceJson, targetJson);

    const result =
      await $`pnpm tansolid remove ui.molecules.Tooltip.constants`;
    expect(result.stdout).toContain('Suppression des fichiers');
    expect(result.stdout).toContain('Fichiers supprimés');

    const bemedevJsonContent = JSON.parse(
      fs.readFileSync(targetJson, 'utf8'),
    );
    expect(bemedevJsonContent.files).not.toContain(
      'ui.molecules.Tooltip.constants',
    );

    fs.copyFileSync(targetJson, sourceJson);
  });

  test.skip('should destroy the configuration and directory structure', async () => {
    const sourceJson = path.join('.tansolid.bemedev.json');
    const targetJson = path.join('.bemedev.json');

    if (!fs.existsSync(sourceJson) && fs.existsSync(targetJson)) {
      fs.copyFileSync(targetJson, sourceJson);
    }

    const result = await $`pnpm tansolid destroy`;
    expect(result.stdout).toContain('Folder');
    expect(result.stdout).toContain('has been removed');
    expect(result.stdout).toContain('Configuration file');

    const hasTansolidDir = fs.existsSync(path.join('.tansolid'));
    const hasTansolidJson = fs.existsSync(sourceJson);
    expect(hasTansolidDir).toBe(false);
    expect(hasTansolidJson).toBe(false);
  });
});
