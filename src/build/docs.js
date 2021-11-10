import chalk from 'chalk';
import documentation from 'documentation';

import log from '../log.js';
import { libPath, truncatePath } from '../paths.js';

/*
async function convertJSDocToHTML(file) {
    return documentation
        .build([file], { extension: 'js', shallow: true })
        .then(comments => )
}
*/

function documentationBuilder(targetFiles) {
    log(chalk.cyan('\nCompiling API documentation from JS Files...\n'))

    targetFiles.forEach((file) => {
        log(truncatePath(file, libPath))
    })
}

export default documentationBuilder;