import chalk from 'chalk'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log(__filename);

// Paths
const projectPath = path.resolve(__dirname, '..');
const libPath = path.join(projectPath, 'node_modules/ids-enterprise-wc/')
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
    utilsMD: path.join(libPath, 'src/utils/**/*.md')
}

// Util functions
function truncatePath(path, part) {
    return path.replace(part, `${chalk.yellow('[library path]')}/`)
}

export default PATHS;
export { projectPath, libPath, truncatePath }
