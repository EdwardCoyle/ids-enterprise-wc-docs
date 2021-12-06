#!/usr/bin/env node
import chalk from 'chalk';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import docsRunner from './src/runner.js';
import log from './src/log.js';

// ====================================================
// Main CLI Task
// ====================================================

log(`${chalk.bold('\nIDS Web Components Documentation Builder')}`)

yargs(hideBin(process.argv))
  .usage('Usage: $0 [options]')
  .command('*', 'outputs documentation in a specified format', (yargs) => { return yargs; }, async (argv) => {
    docsRunner(argv.format, argv.compress)
  })
  .option('compress', {
    alias: 'c',
    type: 'boolean',
    description: 'Create a zip file containing the generated docs'
  })
  .option('verbose', {
    alias: 'v',
    type: 'boolean',
    description: 'Run with verbose logging'
  })
  .option('format', {
    alias: 'f',
    type: 'string',
    description: 'The format in which to render JSDoc output'
  })
  .demandCommand()
  .recommendCommands()
  .showHelpOnFail(true)
  .help()
  .parse()
