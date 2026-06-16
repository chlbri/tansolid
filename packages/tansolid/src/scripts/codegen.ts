import { writeFileSync } from 'node:fs';
import { relative, join } from 'node:path';
import { Project } from 'ts-morph';
import * as v from 'valibot';

import { CodebaseAnalysisSchema, transformJSON } from '@bemedev/codebase';
import { addJSDocToSourceText } from '@bemedev/codebase/lib/analyse.utils.js';
import { analyzeExports } from '@bemedev/codebase/lib/exports.js';
import { toArray } from '@bemedev/codebase/lib/helpers.js';
import {
  analyzeImports,
  buildImportStrings,
} from '@bemedev/codebase/lib/imports.js';
export function pathToDotNotation(filePath: string): string {
  return filePath
    .replace(/\.(ts|tsx)$/, '') // Enlever l'extension .ts ou .tsx
    .replace(/\//g, '.'); // Remplacer les / par des .
}

export const analyzeCustom = ({
  src = 'src',
  excludes: _excludes = [] as string[],
} = {}) => {
  console.log('🔍 [Custom] Codebase analysis in progress (TS + TSX)...');
  const excludes = toArray(_excludes);

  const project = new Project({
    tsConfigFilePath: join(process.cwd(), 'tsconfig.json'),
  });

  const sourceFiles = project.addSourceFilesAtPaths(
    [
      `${src}/**/*.ts`,
      `${src}/**/*.tsx`,
      `!${src}/**/*.test.ts`,
      `!${src}/**/*.test.tsx`,
      `!${src}/**/*.spec.ts`,
      `!${src}/**/*.spec.tsx`,
    ].concat(excludes.map(exclude => `!${exclude}`)),
  );

  const analysis: any = {};
  let processedCount = 0;
  for (const sourceFile of sourceFiles) {
    const relativePath = relative(src, sourceFile.getFilePath());
    const _text = addJSDocToSourceText(sourceFile as any);
    const imports = analyzeImports(sourceFile as any);
    const exports = analyzeExports(sourceFile as any);
    const importsStrings = buildImportStrings(imports);
    const importsSection =
      importsStrings.length > 0 ? importsStrings.join('\n') : '';
    const text =
      importsSection === ''
        ? _text
        : `${importsSection}\n\n${_text}\n    `;

    analysis[pathToDotNotation(relativePath)] = {
      relativePath,
      imports,
      exports,
      text,
    };
    processedCount++;
    if (processedCount % 50 === 0) {
      console.log(
        `📊 Analysé ${processedCount}/${sourceFiles.length} fichiers...`,
      );
    }
  }
  console.log(
    `✅ Codebase analysis complete: ${processedCount} files analyzed`,
  );
  return v.parse(CodebaseAnalysisSchema, analysis);
};

export const generateCustom = ({
  output = '.codebase.json',
  excludes = [] as string[],
  src = 'src',
} = {}) => {
  try {
    const analysis = analyzeCustom({ src, excludes });
    const transformed = transformJSON(analysis);
    const json = JSON.stringify(transformed, null, 2);
    writeFileSync(output, json);
    console.log(`📁 Custom codebase analysis saved to: ${output}`);
    console.log(`📊 Statistics:`);
    console.log(`   - Files analyzed: ${transformed.STATS.files}`);
    console.log(`   - Total imports: ${transformed.STATS.imports}`);
    console.log(`   - Total exports: ${transformed.STATS.exports}`);
  } catch (error) {
    console.error('❌ Error during codebase generation:', error);
    process.exit(1);
  }
};

// Execute
const excludes = [
  'src/**/*.test.ts',
  'src/**/*.test-d.ts',
  'src/scripts/**/*',
  'src/**/__tests__/**/*',
];
generateCustom({ output: '.codebase.json', excludes, src: 'src' });
