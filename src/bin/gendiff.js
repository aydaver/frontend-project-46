#!/usr/bin/env node

import { program } from 'commander';

// eslint-disable-next-line import/extensions
import parser from './gendiff-parser-json.js';

// eslint-disable-next-line import/extensions
import gendiff from './gendiff-differ-json.js';

const command = (file1path, file2path) => {
  // eslint-disable-next-line no-console
  console.log(gendiff(parser(file1path, file2path)));
};

program
  .action(command)
  .arguments('file1path file2path')
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .parse(process.argv);
