import {
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from 'node:fs';
import { join, relative } from 'node:path';
import {
  config as localConfig,
  DEFAULT_ROOT,
  JSON_PATH,
} from '../constants';
import { getFolderPath, writeFileAnalysis, getCodebase } from '../helpers';
import type { CodebaseAnalysis } from '@bemedev/codebase';

export interface InitOptions {
  root: string;
  json: string;
}

export const createTypesStructure = (
  folderPath: string,
  CODEBASE_ANALYSIS: CodebaseAnalysis,
) => {
  const entries = Object.entries(CODEBASE_ANALYSIS).filter(
    ([key, fileAnalysis]) => {
      const segments = key.split('.');
      const pathSegments = fileAnalysis.relativePath.split('/');

      const isConstant =
        segments.includes('constants') ||
        pathSegments.includes('constants');

      const isType =
        segments.includes('types') || pathSegments.includes('types');

      return isConstant || isType;
    },
  );

  const PATHS: string[] = [];

  console.log(
    `🔧 Création de la structure de types (${entries.length} fichiers)...`,
  );

  for (const [, fileAnalysis] of entries) {
    const file = writeFileAnalysis(fileAnalysis, folderPath);
    if (file) PATHS.push(file);
  }

  console.log(`✅ Structure de types créée avec succès!`);
  return PATHS;
};

export const init = (options: Partial<InitOptions> = {}) => {
  const { root = DEFAULT_ROOT, json = JSON_PATH } = options;
  const CODEBASE_ANALYSIS = getCodebase();
  localConfig.json = json;

  const cwd = process.cwd();
  const configFile = join(cwd, json);
  const configExists = existsSync(configFile);

  if (configExists) return true;
  const folderPath = getFolderPath(root);

  // 1. Créer le dossier
  try {
    mkdirSync(folderPath, { recursive: true });
    console.log(`✅ Dossier .bemedev créé dans: ${root}`);
  } catch (error) {
    console.error(
      `❌ Erreur lors de la création du dossier .bemedev:`,
      error,
    );
    return false;
  }

  let files: string[] = [];
  // 1.5. Créer la structure des fichiers types
  try {
    files = createTypesStructure(folderPath, CODEBASE_ANALYSIS);
  } catch {
    console.error(
      `❌ Erreur lors de la création de la structure de types:`,
    );
    return false;
  }

  // 2. Mettre à jour le tsconfig.json
  const tsconfigPath = join(cwd, 'tsconfig.json');

  if (existsSync(tsconfigPath)) {
    try {
      const tsconfigContent = readFileSync(tsconfigPath, 'utf8');
      const tsconfig = JSON.parse(tsconfigContent);

      if (!tsconfig.compilerOptions) {
        tsconfig.compilerOptions = {};
      }

      if (!tsconfig.compilerOptions.paths) {
        tsconfig.compilerOptions.paths = {};
      }

      const relativePath = relative(process.cwd(), folderPath);
      tsconfig.compilerOptions.paths['#bemedev/*'] = [
        `./${relativePath}/*`,
      ];

      writeFileSync(
        tsconfigPath,
        JSON.stringify(tsconfig, null, 2),
        'utf8',
      );
      console.log(`✅ Path #bemedev/* ajouté au tsconfig.json`);
    } catch (error) {
      console.error(
        `❌ Erreur lors de la mise à jour du tsconfig.json:`,
        error,
      );
      return false;
    }
  } else {
    console.warn(`⚠️ Fichier tsconfig.json introuvable, path non ajouté`);
  }

  // 3. Créer le fichier .bemedev.json à la racine
  const config = {
    version: '1.0.0',
    path: root,
    files: files,
  };

  try {
    writeFileSync(configFile, JSON.stringify(config, null, 2), 'utf8');
    console.log(`✅ Fichier .bemedev.json créé à la racine du projet`);
  } catch (error) {
    console.error(
      `❌ Erreur lors de la création du fichier .bemedev.json:`,
      error,
    );
    return false;
  }

  console.log(`🎉 Initialisation de bemedev terminée avec succès!`);
  return true;
};
