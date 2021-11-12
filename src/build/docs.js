import chalk from 'chalk';
import documentation from 'documentation';
import fs from 'fs/promises';
import path from 'path';

import log from '../log.js';
import { libPath, projectPath, buildPath, templatePath, truncatePath } from '../paths.js';

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
async function convertJSDocToHTML(file) {
    const shortFileName = truncatePath(file, libPath, true, true).substring(0, file.lastIndexOf('.') || file.length);
    
    return new Promise((resolve, reject) => {
        log(`converting JS file "${chalk.gray(shortFileName)}"...`)

        return documentation
            .build(file, {
                babel: path.join(libPath, 'babel.config.js'),
                extension: 'js',
                shallow: true,
            })
            .then(output => {
                log(`formatting output from JS file "${chalk.magenta(shortFileName)}"...`)
                return documentation.formats.html(output, {
                    theme: `${path.join(projectPath, 'src', 'templates')}`
                });
            })
            .then(async (output) => {
                const outputFile = `${path.join(projectPath, 'build', 'html', shortFileName)}.html`
                const shortOutputFile = truncatePath(outputFile, projectPath, true)
                log(`saving output as HTML file "${chalk.yellow(shortOutputFile)}"...`)
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
 * @returns {Promise<>}
 */
async function copyAssets() {
    const src = path.join(templatePath, 'assets')
    const dest = path.join(buildPath, 'html/assets')
    return fs.cp(src, dest, { recursive: true })
}

/**
 * Builds Markdown documentation from JSDoc comments inside of each file in the provided file list
 * @param {Array<string>} targetFiles a list of file paths to be scanned
 * @returns {Promise<Array<string>>} Resolved with converted file output(s) when all files provided are converted
 */
async function documentationBuilder(targetFiles) {
    return new Promise((resolve) => {
        log(chalk.cyan('\nCompiling API documentation from JS Files...\n'))

        const buildTasks = [];

        // Convert specified JS files to documented HTML pages
        targetFiles.forEach((file) => {
            buildTasks.push(convertJSDocToHTML(file));
        })

        // Create an Index/Table of Contents
        buildTasks.push(copyAssets());

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