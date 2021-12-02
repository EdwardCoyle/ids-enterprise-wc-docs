import chalk from 'chalk'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Paths
const projectPath = path.resolve(__dirname, '..')
const buildPath = path.join(projectPath, 'build')
const libPath = path.join(projectPath, 'node_modules/ids-enterprise-wc/')
const themesPath = path.join(projectPath, 'src/themes');

const PATHS = {
    src: path.join(libPath, 'src'),
    output: path.join(projectPath, 'build'),
    components: path.join(libPath, 'src/components/'),
    componentsJS: path.join(libPath, 'src/components/**/*!(index).js'),
    componentsMD: path.join(libPath, 'src/components/**/readme.md'),
    mixins: path.join(libPath, 'src/mixins'),
    mixinsJS: path.join(libPath, 'src/mixins/**/ids-*.js'),
    mixinsMD: path.join(libPath, 'src/mixins/**/readme.md'),
    utils: path.join(libPath, 'src/utils'),
    utilsJS: path.join(libPath, 'src/utils/**/ids-*.js'),
    utilsMD: path.join(libPath, 'src/utils/**/readme.md'),

    // Used for testing
    // Need to ignore culture files and any non-component-related JS.
    // @TODO: make this pull in everything but index files once we resolve this issue:
    // SyntaxError: Using the export keyword between a decorator and a class is not allowed. Please use `export @dec class` instead. (35:0)
    // being caused by having `export default class [whatever] immediately after a decorator`
    testComponentsJS: path.join(libPath, 'src/components/**/ids-!(draggable*|loading-indicator*|pager*|spinbox*).js'),
}

// Util functions
function truncatePath(path, part, raw, addSlash) {
    const slash = addSlash ? '/' : '';
    const replacementStr = raw ? slash : `${chalk.yellow('[library path]')}${slash}`
    return path.replace(part, replacementStr)
}

export default PATHS;
export { projectPath, buildPath, libPath, themesPath, truncatePath }
