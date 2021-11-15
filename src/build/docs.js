import chalk from 'chalk';
import documentation from 'documentation';
import fs from 'fs/promises';
import path from 'path';

import log from '../log.js';
import { libPath, projectPath, buildPath, themesPath, truncatePath } from '../paths.js';

/**
 * Writes an MD file to disk, accounting for missing folders
 * @param {string} filePath
 * @param {string} data
 * @returns {void}
 */
async function writeDocs(filePath, data) {
    const outputDir = path.dirname(filePath);

    try {
        await fs.access(outputDir);
    } catch (e) {
        await fs.mkdir(outputDir, { recursive: true })
    }

    await fs.writeFile(filePath, data, 'utf8')
}

/**
 * Uses the `documentation.js` library to convert IDS Source code to Markdown
 * @param {string} file the name of the file to convert
 * @returns {Promise<string>} Promise, resolved with converted output when the file is written to disk, rejected otherwise
 */
async function convertJSDoc(file, theme = 'default', format = 'html') {
    const shortFileName = truncatePath(file, libPath, true, true).substring(0, file.lastIndexOf('.') || file.length);

    return new Promise((resolve, reject) => {
        log(`converting JS file "${chalk.gray(shortFileName)}"...`)

        return documentation
            // Translate comments from file
            .build([file], {
                babel: path.join(libPath, 'babel.config.js'),
                // inferPrivate: '^#',
                shallow: true,
            })
            // Output into themeable HTML
            .then(output => {
                if (format && format === 'html') {
                  log(`formatting HTML output from JS file "${chalk.magenta(shortFileName)}"...`)
                  return documentation.formats.html(output, {
                    theme: `${path.join(projectPath, 'src', 'themes', `${theme}`)}`
                  });
                } else {
                  return output;
                }
            })
            // Output into JSON
            .then(output => {
              if (format && format === 'json') {
                return documentation.formats.json(output)
              } else {
                return output;
              }
            })
            // Output into Markdown
            .then(output => {
              if (format && format === 'md') {
                log(`formatting Markdown output from JS file "${chalk.keyword('orange')(shortFileName)}"...`)
                return documentation.formats.md(output);
              } else {
                return output;
              }
            })
            .then(async (output) => {
                const outputFile = `${path.join(projectPath, 'build', format, shortFileName)}.${format}`
                const shortOutputFile = truncatePath(outputFile, projectPath, true)
                log(`saving output as file "${chalk.yellow(shortOutputFile)}"...`)
                try {
                    await writeDocs(outputFile, output);
                    resolve(output);
                } catch (e) {
                    reject(e);
                }
            });
        }
    );
}

/**
 * Copies assets from the Theme source folder to the build output
 * @param {string} theme defines the theme folder to search for assets
 * @returns {Promise<>}
 */
async function copyAssets(theme = 'default') {
    const src = path.join(themesPath, `${theme}`, 'assets')
    const dest = path.join(buildPath, 'html/assets')
    return fs.cp(src, dest, { recursive: true })
}

/**
 * Builds Markdown documentation from JSDoc comments inside of each file in the provided file list
 * @param {Array<string>} targetFiles a list of file paths to be scanned
 * @returns {Promise<Array<string>>} Resolved with converted file output(s) when all files provided are converted
 */
async function documentationBuilder(targetFiles, theme, format = 'html') {
  return new Promise((resolve) => {
    log(chalk.cyan(`\nCompiling API documentation from JS Files in "${format}" format...\n`))

    const buildTasks = [];

    // Convert JS files to specified documentation format
    targetFiles.forEach((file) => {
      buildTasks.push(convertJSDoc(file, theme, format));
    })

    // If building HTML-based documentation, copy web assets such as CSS and images
    if (format === 'html') {
      buildTasks.push(copyAssets(theme));
    }

    Promise
      .all(buildTasks)
      .then((values) => {
          log(`${chalk.cyan('\nConverted JSDoc comments from')} ${chalk.cyan.bold(targetFiles.length)} ${chalk.cyan('file(s)')}`);
          resolve(values);
      })
      .catch((err) => {
          log(err.message);
      })
  })
}

export default documentationBuilder;
