import chalk from 'chalk';

import PATHS, { projectPath, libPath, truncatePath } from './paths.js';
import { getFiles } from './getFiles.js';
import log from './log.js';

import documentationBuilder from './documentationBuilder.js';
import readmeCopier from './readmeCopier.js';
import zip from './zip.js';

const FORMATS = ['md', 'json', 'html'];

// ====================================================
// Main Build Task
// ====================================================

const docsRunner = async (format = FORMATS[0], doCompress = false) => {
  const doReadmeCopy = format === 'md';

  log(`\n${chalk.magenta(`[project path]`)}: ${projectPath}`);
  log(`${chalk.yellow(`[library path]`)}: ${libPath}`);

  async function getAndAnalyzeFiles(path) {
    const files = await getFiles(`${path}`);
    log(`${truncatePath(path, libPath, false, true)}: ${chalk.bold(`${files.length} file(s) found`)}`);
    return files;
  }

  // ==============================
  // Analyze Files

  log(chalk.cyan('\nAnalyzing library files...'), 'log', true);

  const builtJSFiles = await getAndAnalyzeFiles(PATHS.builtJS);
  let componentMDFiles;
  let mixinMDFiles;
  let utilsMDFiles;

  if (doReadmeCopy) {
    componentMDFiles = await getAndAnalyzeFiles(PATHS.componentsMD);
    mixinMDFiles = await getAndAnalyzeFiles(PATHS.mixinsMD);
    utilsMDFiles = await getAndAnalyzeFiles(PATHS.utilsMD);
  }

  // ==============================
  // Run Tasks

  // These tasks are to be completed before this script finishes
  const completionTasks = [];

  log(chalk.cyan(`\nCompiling documentation from JS Files into "${format}" format...`), 'log', true);

  // Build API documentation from JS files, if found
  // available formats: 'html', 'md', 'json'
  completionTasks.push(
    documentationBuilder(
      [...builtJSFiles],
      'default',
      format
    )
  );

  // Copy handwritten README.md files from the Web Components source code
  // ONLY do this when building Markdown for production
  if (doReadmeCopy) {
    completionTasks.push(
      readmeCopier(
        [...componentMDFiles, ...mixinMDFiles, ...utilsMDFiles]
      )
    );
  }

  // ==============================
  // Done

  return Promise
    .all(completionTasks)
    .then(() => zip(PATHS.output, PATHS.outputZip, doCompress))
    .then(() => {
      log(chalk.green(`\nDocumentation Build is Complete!`), 'log', true);
    })
    .catch((err) => {
      log(chalk.red(err.message), 'trace');
    })
}

export default docsRunner;
