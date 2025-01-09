import * as fs from 'fs';
import FigmaApi from './figma_api.js';
import { green } from './utils.js';
import { tokenFilesFromLocalVariables } from './token_export.js';

/**
 * Usage:
 *
 * // Defaults to writing to the tokens_new directory
 * npm run sync-figma-to-tokens
 *
 * // Writes to the specified directory
 * npm run sync-figma-to-tokens -- --output directory_name
 */

async function main() {
  // Accediendo a las variables de entorno con la notación de corchetes
  const personalAccessToken = process.env['PERSONAL_ACCESS_TOKEN'];
  const fileKey = process.env['FILE_KEY'];

  if (!personalAccessToken || !fileKey) {
    throw new Error('PERSONAL_ACCESS_TOKEN and FILE_KEY environment variables are required');
  }

  const api = new FigmaApi(personalAccessToken);
  const localVariables = await api.getLocalVariables(fileKey);
  const tokensFiles = tokenFilesFromLocalVariables(localVariables);

  let outputDir = 'tokens_new';
  const outputArgIdx = process.argv.indexOf('--output');
  if (outputArgIdx !== -1) {
    outputDir = process.argv[outputArgIdx + 1];
  }

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  Object.entries(tokensFiles).forEach(([fileName, fileContent]) => {
    fs.writeFileSync(`${outputDir}/${fileName}`, JSON.stringify(fileContent, null, 2));
    console.log(`Wrote ${fileName}`);
  });

  console.log(green(`✅ Tokens files have been written to the ${outputDir} directory`));
}

main();
