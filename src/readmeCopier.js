import chalk from 'chalk';
import fs from 'fs/promises';
import path from 'path';

import log from './log.js';
import { libPath, buildPath, truncatePath } from './paths.js';

async function copyReadme(file) {
  const shortFileName = truncatePath(file, libPath, true, true).substring(0, file.lastIndexOf('.') || file.length);
  const src = path.join(libPath, shortFileName)
  const dest = path.join(buildPath, 'md', shortFileName.toLowerCase())
  return fs.cp(src, dest, { recursive: true }).then(() => {
    log(`copied MD file "${chalk.gray(shortFileName)}"...`)
  })
}

/**
 * Copies handwritten README.md files from Web Components and adds them to the correct places within the build output
 * @param {Array<string>} targetFiles a list of file paths to be scanned
 * @returns {Promise<Array<string>>} Resolved with converted file output(s) when all files provided are converted
 */
async function readmeCopier(targetFiles) {
  return new Promise((resolve) => {
    const buildTasks = [];

    // Copies the file from the source code to this project's build output
    targetFiles.forEach((file) => {
      buildTasks.push(copyReadme(file));
    })

    Promise
      .all(buildTasks)
      .then((values) => {
        log(`${chalk.cyan('Copied')} ${chalk.cyan.bold(targetFiles.length)} ${chalk.cyan('README file(s)')}`);
        resolve(values);
      })
      .catch((err) => {
        log(err.message);
      })
  })
}

export default readmeCopier;
