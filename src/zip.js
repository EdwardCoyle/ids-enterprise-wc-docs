import archiver from 'archiver';
import chalk from 'chalk';
import fs from 'fs';
import log from './log.js';

// catch warnings (fx: stat failures and other non-blocking errors)
const warn = (err) => {
  if (err.code === 'ENOENT') {
    log(err.message, 'warn');
  } else {
    throw err;
  }
}

/**
 * Takes any files generated to the `build/` folder and compresses the contents to a zip file
 * @param {string} targetPath path used for locating files to be compressed
 * @param {string} outputFile path to the output zip file
 * @param {boolean} doCompress true if compression should occur
 * @returns {Promise<boolean>} resolves with `true` when the zip file is generated and saved
 */
export default async function zip(targetPath, outputFile, doCompress = true) {
  const archive = archiver('zip', { zlib: { level: 9 } });
  const stream = fs.createWriteStream(outputFile);

  // Compression can be toggled by CLI flags.
  // We want to escape if the user has compression disabled.
  if (!doCompress) {
    log(chalk.cyan(`\nSkipping ZIP compression`), 'log', true);
    return Promise.resolve(doCompress);
  }

  // Do file compression with Archiver
  return new Promise((resolve, reject) => {
    archive
      .directory(`${targetPath}/md`, false)
      .directory(`${targetPath}/html`, false)
      .directory(`${targetPath}/json`, false)
      .on('warning', err => warn(err))
      .on('error', err => {
        log(err.message, 'trace')
        reject(err);
      })
      .pipe(stream);

    stream.on('close', () => {
      log(chalk.cyan(`\nCompressed generated files to ${chalk.bold(outputFile)}`), 'log', true);
      return resolve(true);
    });
    archive.finalize();
  });
}
