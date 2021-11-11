import chalk from 'chalk';
import documentation from 'documentation';
import fs from 'fs';
import path from 'path';
import util from 'util';

import log from '../log.js';
import { libPath, projectPath, truncatePath } from '../paths.js';

// Promisified versions of fs modules
const exists = util.promisify(fs.exists);
const mkdir = util.promisify(fs.mkdir);
const writeFile = util.promisify(fs.writeFile);

/**
 * Writes an MD file to disk, accounting for missing folders
 * @param {string} filePath 
 * @param {string} data
 * @returns {void}
 */
async function writeMDFile(filePath, data) {
    const outputDir = path.dirname(filePath);
    const doesExist = await exists(outputDir);
    if (!doesExist) {
        await mkdir(outputDir, { recursive: true })
    }

    await writeFile(filePath, data, 'utf8')
}

/**
 * Uses the `documentation.js` library to convert IDS Source code to Markdown
 * @param {string} file the name of the file to convert
 * @returns {Promise<>} Promise, resolved when the file is written to disk, rejected otherwise
 */
async function convertJSDocToMD(file) {
    const shortFileName = truncatePath(file, libPath, true).substring(0, file.lastIndexOf('.') || file.length);

    return new Promise((resolve, reject) => {
        return documentation
            .build(file, {
                babel: path.join(libPath, 'babel.config.js'),
                extension: 'js',
                shallow: true,
            })
            .then(documentation.formats.md)
            .then(async (output) => {
                const outputFile = `${path.join(projectPath, 'build', 'md', shortFileName)}.md`
                try {
                    await writeMDFile(outputFile, output);
                    resolve(output);
                } catch (e) {
                    reject(e);
                }
            });
        }
    );
}

/**
 * Builds Markdown documentation from JSDoc comments inside of each file in the provided file list
 * @param {Array<string>} targetFiles a list of file paths to be scanned
 * @returns {Promise}
 */
async function documentationBuilder(targetFiles) {
    return new Promise((resolve) => {
        log(chalk.cyan('\nCompiling API documentation from JS Files...\n'))

        const convertedFiles = [];
        targetFiles.forEach((file) => {
            convertedFiles.push(convertJSDocToMD(file));
        })

        Promise.all(convertedFiles).then((values) => {
            log(chalk.bold(`Converted JSDoc comments from ${values.length} file(s)`));
            resolve(values);
        })
    })
}

export default documentationBuilder;