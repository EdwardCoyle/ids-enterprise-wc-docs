import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const { argv } = yargs(hideBin(process.argv));

function log(str, type = 'log', doShow = false) {
  if (argv.verbose || doShow) {
    console[type](str);
  }
}

export default log;
