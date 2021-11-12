import chalk from 'chalk'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Paths
const projectPath = path.resolve(__dirname, '..')
const buildPath = path.join(projectPath, 'build')
const libPath = path.join(projectPath, 'node_modules/ids-enterprise-wc/')
const templatePath = path.join(projectPath, 'src/templates');

const PATHS = {
    src: path.join(libPath, 'src'),
    output: path.join(projectPath, 'build'),
    components: path.join(libPath, 'src/components/'),
    componentsJS: path.join(libPath, 'src/components/**/*.js'),
    componentsMD: path.join(libPath, 'src/components/**/*.md'),
    mixins: path.join(libPath, 'src/mixins'),
    mixinsJS: path.join(libPath, 'src/mixins/**/*.js'),
    mixinsMD: path.join(libPath, 'src/mixins/**/*.md'),
    utils: path.join(libPath, 'src/utils'),
    utilsJS: path.join(libPath, 'src/utils/**/*.js'),
    utilsMD: path.join(libPath, 'src/utils/**/*.md'),
    testComponentJS: path.join(libPath, 'src/components/ids-tag/ids-tag.js')
}

// Util functions
function truncatePath(path, part, raw) {
    const replacementStr = raw ? '/' : `${chalk.yellow('[library path]')}/`
    return path.replace(part, replacementStr)
}

export default PATHS;
export { projectPath, buildPath, libPath, templatePath, truncatePath }
