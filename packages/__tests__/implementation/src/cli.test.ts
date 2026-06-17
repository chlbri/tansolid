import { $ } from 'zx';
import path from 'node:path';
import fs from 'node:fs';

const FOLDER = 'tansolid';
const JSON_PATH = '.tansolid.bemedev.json';

describe('CLI tests', () => {
  const tsconfigPath = path.join(process.cwd(), 'tsconfig.json');
  let originalTsconfig: string;

  const rinit = () => {
    const path_folder = path.join(process.cwd(), 'src', FOLDER);
    if (fs.existsSync(path_folder)) {
      fs.rmSync(path_folder, { recursive: true, force: true });
    }

    if (fs.existsSync(path.join(process.cwd(), JSON_PATH))) {
      fs.rmSync(path.join(process.cwd(), JSON_PATH));
    }

    if (originalTsconfig !== undefined && fs.existsSync(tsconfigPath)) {
      fs.writeFileSync(tsconfigPath, originalTsconfig, 'utf8');
    }
  };

  beforeAll(() => {
    rinit();
    if (fs.existsSync(tsconfigPath)) {
      originalTsconfig = fs.readFileSync(tsconfigPath, 'utf8');
    }
  });

  // afterAll(rinit);

  test('should display help', async () => {
    const result = await $`pnpm tansolid --help`;
    expect(result.stdout).toContain('tansolid');
  });

  test('should initialize config and folder structure', async () => {
    const tsconfigPath = path.join(process.cwd(), 'tsconfig.json');

    const result = await $`pnpm tansolid init`;

    expect(result.stdout).toContain(
      'Bemedev initialization completed successfully',
    );

    const hasTansolidDir = fs.existsSync(
      path.join(process.cwd(), 'src', FOLDER),
    );
    const hasTansolidJson = fs.existsSync(
      path.join(process.cwd(), JSON_PATH),
    );
    console.log(path.join(process.cwd(), JSON_PATH));
    expect(hasTansolidDir).toBe(true);
    expect(hasTansolidJson).toBe(true);

    const tsconfigContent = JSON.parse(
      fs.readFileSync(tsconfigPath, 'utf8'),
    );
    expect(tsconfigContent.compilerOptions.paths).toBeDefined();
    expect(tsconfigContent.compilerOptions.paths['#tansolid/*']).toEqual([
      './src/tansolid/*',
    ]);
  });

  test('should add a file to the codebase configuration', async () => {
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
  });

  test('should remove a file from the codebase configuration', async () => {
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
  });

  test.skip('should destroy the configuration and directory structure', async () => {
    const result = await $`pnpm tansolid destroy`;
    expect(result.stdout).toContain('Folder');
    expect(result.stdout).toContain('has been removed');
    expect(result.stdout).toContain('Configuration file');

    const hasTansolidDir = fs.existsSync(path.join('.tansolid'));
    const hasTansolidJson = fs.existsSync(JSON_PATH);
    expect(hasTansolidDir).toBe(false);
    expect(hasTansolidJson).toBe(false);
  });
});
