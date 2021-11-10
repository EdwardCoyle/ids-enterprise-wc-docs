
import chalk from 'chalk'
import path from 'path'
import { fileURLToPath } from 'url';

import { getFiles } from './src/lib/getFiles.js'
import log from './src/lib/log.js';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Paths
const libPath = path.resolve(__dirname, 'node_modules/ids-enterprise-wc/');
const outputPath = path.resolve(__dirname, 'build');
const PATHS = {
    src: path.join(libPath, 'src'),
    components: path.join(libPath, 'src/components/'),
    componentsJS: path.join(libPath, 'src/components/**/*.js'),
    componentsMD: path.join(libPath, 'src/components/**/*.md'),
    mixins: path.join(libPath, 'src/mixins'),
    mixinsJS: path.join(libPath, 'src/mixins/**/*.js'),
    mixinsMD: path.join(libPath, 'src/mixins/**/*.md'),
    utils: path.join(libPath, 'src/utils'),
    utilsJS: path.join(libPath, 'src/utils/**/*.js'),
    utilsMD: path.join(libPath, 'src/utils/**/*.md')
}

// ====================================================
// Main Build Task
// ====================================================

console.log(`${chalk.bold('IDS Web Components Documentation build is running...')}\n`)

async function getAndAnalyzeFiles(path) {
    const files = await getFiles(`${path}`)
    log(`${chalk.cyan(path)}: ${chalk.bold(`${files.length} file(s) found`)}`)
    return files;
}

const componentJSFiles = await getAndAnalyzeFiles(PATHS.componentsJS);
const mixinJSFiles = await getAndAnalyzeFiles(PATHS.mixinsJS);
const utilsJSFiles = await getAndAnalyzeFiles(PATHS.utilsJS);

