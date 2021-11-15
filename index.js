
import chalk from 'chalk'

import PATHS, { projectPath, libPath, truncatePath } from './src/paths.js'
import { getFiles } from './src/getFiles.js'
import log from './src/log.js'

import documentationBuilder from './src/build/docs.js';

// ====================================================
// Main Build Task
// ====================================================

log('\n')
log(`${chalk.bold('IDS Web Components Documentation Builder')}`)
log(`${chalk.magenta(`[project path]`)}: ${projectPath}`)
log(`${chalk.yellow(`[library path]`)}: ${libPath}\n`)

async function getAndAnalyzeFiles(path) {
    const files = await getFiles(`${path}`)
    log(`${truncatePath(path, libPath)}: ${chalk.bold(`${files.length} file(s) found`)}`)
    return files
}

log(chalk.cyan('Analyzing library files...\n'))

// @TODO: replace test component
const componentJSFiles = await getAndAnalyzeFiles(PATHS.testComponentsJS)
const mixinJSFiles = await getAndAnalyzeFiles(PATHS.mixinsJS)
const utilsJSFiles = await getAndAnalyzeFiles(PATHS.utilsJS)

// These tasks are to be completed before this script finishes
const completionTasks = [];

// Build API documentation from JS files, if found
completionTasks.push(documentationBuilder([...componentJSFiles, ...mixinJSFiles, ...utilsJSFiles], 'default'));

Promise
    .all(completionTasks)
    .then(() => {
        log(chalk.green(`\nDocumentation Build is Complete!`))
    })
    .catch((err) => {
        log(err.message);
    })
