import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const { argv } = yargs(hideBin(process.argv));

function log(str, type = 'log') {
  if (argv.verbose) {
    console[type](str);
  }
}

export default log;
