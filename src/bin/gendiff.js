#!/usr/bin/env node

/* eslint-disable import/extensions */

import { program } from 'commander';

import gendiff from './gendiff-differ-json.js';

import parse from './gendiff-parser.js';

import stylish from './formater-stylish.js';

const formatters = {
  // eslint-disable-next-line global-require
  stylish,
};

const command = (file1path, file2path, options) => {
  const { format } = options;
  const diff = gendiff(parse(file1path, file2path));
  // eslint-disable-next-line no-console
  console.log(formatters[format](diff));
};

program
  .action(command)
  .arguments('<file1path> <file2path>')
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format', 'stylish')
  .parse(process.argv);
