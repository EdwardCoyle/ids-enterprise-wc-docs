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
  outputZip: path.join(projectPath, 'build/ids-docs.zip'),
  builtJS: path.join(libPath, 'build/development/**/ids-*.js'),
  componentsMD: path.join(libPath, 'src/components/**/readme.md'),
  mixins: path.join(libPath, 'src/mixins'),
  mixinsMD: path.join(libPath, 'src/mixins/**/readme.md'),
  utils: path.join(libPath, 'src/utils'),
  utilsMD: path.join(libPath, 'src/utils/**/readme.md'),
}

// Util functions
function truncatePath(path, part, raw, addSlash) {
  const slash = addSlash ? '/' : '';
  const replacementStr = raw ? slash : `${chalk.yellow('[library path]')}${slash}`
  return path.replace(part, replacementStr)
}

export default PATHS;
export { projectPath, buildPath, libPath, themesPath, truncatePath }
