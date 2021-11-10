
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
log(`${chalk.yellow(`[library path]`)}: ${libPath}`)
log('\n')

async function getAndAnalyzeFiles(path) {
    const files = await getFiles(`${path}`)
    log(`${truncatePath(path, libPath)}: ${chalk.bold(`${files.length} file(s) found`)}`)
    return files
}

log(chalk.cyan('Analyzing library files...\n'))

const componentJSFiles = await getAndAnalyzeFiles(PATHS.componentsJS)
const mixinJSFiles = await getAndAnalyzeFiles(PATHS.mixinsJS)
const utilsJSFiles = await getAndAnalyzeFiles(PATHS.utilsJS)

// These tasks are to be completed before this script finishes
const completionTasks = [];

// Build API documentation from JS files, if found
if (componentJSFiles.length) {
    completionTasks.push(documentationBuilder(componentJSFiles));
}

Promise
    .all(completionTasks)
    .then((...taskResults) => {
        log(chalk.green('\nDONEZO'))
    })