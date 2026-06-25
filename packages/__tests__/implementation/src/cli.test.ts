import { $ } from 'zx';
import path from 'path';
import fs from 'fs';

const FOLDER = 'tansolid';
const JSON_PATH = '.tansolid.bemedev.json';

describe('CLI tests', () => {
  const cwd = path.dirname(__dirname);
  const tsconfigPath = path.join(cwd, 'tsconfig.json');
  const jsonPah = path.join(cwd, 'package.json');
  const PACKAGES = ['lucide-solid', '@kobalte/core'];
  let originalTsconfig: string;

  beforeAll(() => {
    const path_folder = path.join(cwd, 'src', FOLDER);
    if (fs.existsSync(path_folder)) {
      fs.rmSync(path_folder, { recursive: true, force: true });
    }

    if (fs.existsSync(path.join(cwd, JSON_PATH))) {
      fs.rmSync(path.join(cwd, JSON_PATH));
    }

    if (originalTsconfig !== undefined && fs.existsSync(tsconfigPath)) {
      fs.writeFileSync(tsconfigPath, originalTsconfig, 'utf8');
    }
    if (fs.existsSync(tsconfigPath)) {
      originalTsconfig = fs.readFileSync(tsconfigPath, 'utf8');
    }
  });

  afterAll(() => {
    if (fs.existsSync(tsconfigPath)) {
      fs.writeFileSync(tsconfigPath, originalTsconfig, 'utf8');
    }
  });

  test('#01 => should display help', async () => {
    const result = await $`pnpm tansolid --help`;
    expect(result.stdout).toContain('tansolid');

    const readJson = fs.readFileSync(jsonPah, 'utf8');
    PACKAGES.forEach(pack => {
      expect(readJson).not.toContain(pack);
    });
  });

  test('#02 => should initialize config and folder structure', async () => {
    const tsconfigPath = path.join(cwd, 'tsconfig.json');

    const result = await $`pnpm tansolid init`;

    expect(result.stdout).toContain(
      'Bemedev initialization completed successfully',
    );

    console.log(result.stdout);

    const hasTansolidDir = fs.existsSync(path.join(cwd, 'src', FOLDER));
    const hasTansolidJson = fs.existsSync(path.join(cwd, JSON_PATH));
    console.log(path.join(cwd, JSON_PATH));
    expect(hasTansolidDir).toBe(true);
    expect(hasTansolidJson).toBe(true);

    const tsconfigContent = JSON.parse(
      fs.readFileSync(tsconfigPath, 'utf8'),
    );
    expect(tsconfigContent.compilerOptions.paths).toBeDefined();
    expect(tsconfigContent.compilerOptions.paths['#tansolid/*']).toEqual([
      './src/tansolid/*',
    ]);
    const readJson = fs.readFileSync(jsonPah, 'utf8');
    PACKAGES.forEach(pack => {
      expect(readJson).toContain(pack);
    });
  });

  test('#03 => should add a file to the codebase configuration', async () => {
    const sourceJson = path.join(JSON_PATH);

    const result = await $`pnpm tansolid add ui/molecules/Tooltip`;
    console.log(result.stdout);
    expect(result.stdout).toContain(
      `Adding files: [ 'ui/molecules/Tooltip' ]`,
    );

    const bemedevJsonContent = JSON.parse(
      fs.readFileSync(sourceJson, 'utf8'),
    );
    expect(bemedevJsonContent.files).toContain('ui/molecules/Tooltip');
    expect(bemedevJsonContent.files).toContain(
      'ui/molecules/Tooltip.constants',
    );
    expect(bemedevJsonContent.files).toContain(
      'ui/molecules/Tooltip.hook',
    );
    expect(bemedevJsonContent.files).toContain(
      'ui/molecules/Tooltip.types',
    );

    const readJson = fs.readFileSync(jsonPah, 'utf8');
    PACKAGES.forEach(pack => {
      expect(readJson).toContain(pack);
    });
  });

  test('#04 => should remove a file from the codebase configuration', async () => {
    const result =
      await $`pnpm tansolid remove ui.molecules.Tooltip.constants`;
    console.log(result.stdout);
    // expect(result.stdout).toContain('Suppression des fichiers');
    // expect(result.stdout).toContain('Fichiers supprimés');

    const bemedevJsonContent = JSON.parse(
      fs.readFileSync(JSON_PATH, 'utf8'),
    );
    expect(bemedevJsonContent.files).not.toContain(
      'ui.molecules.Tooltip.constants',
    );

    const readJson = fs.readFileSync(jsonPah, 'utf8');
    PACKAGES.forEach(pack => {
      expect(readJson).toContain(pack);
    });
  });

  test('#05 => Add LangSwitcher', async () => {
    const result = await $`pnpm tansolid add ui/molecules/LangSwitcher`;
    console.log(result.stdout);
  });

  test('#06 => should destroy the configuration and directory structure', async () => {
    const result = await $`pnpm tansolid destroy`;
    expect(result.stdout).toContain('Folder');
    expect(result.stdout).toContain('has been removed');
    expect(result.stdout).toContain('Configuration file');

    const hasTansolidDir = fs.existsSync(path.join('.tansolid'));
    const hasTansolidJson = fs.existsSync(JSON_PATH);
    expect(hasTansolidDir).toBe(false);
    expect(hasTansolidJson).toBe(false);
    const readJson = fs.readFileSync(jsonPah, 'utf8');
    PACKAGES.forEach(pack => {
      expect(readJson).not.toContain(pack);
    });
  });
});
