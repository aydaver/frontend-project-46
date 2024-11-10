#!/usr/bin/env node
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable no-console */
/* eslint-disable import/extensions */

import { program } from 'commander';

import gendiff from './gendiff-differ-json.js';

import parse from './gendiff-parser.js';

import stylish from './formatters/formatter-stylish.js';

import plain from './formatters/formatter-plain.js';

import json from './formatters/formatter-json.js';

const formatters = {
  stylish,
  plain,
  json,
};

const command = (file1path, file2path, options) => {
  const { format } = options;
  const diff = gendiff(parse(file1path, file2path));
  console.log(formatters[format](diff));
  console.log(diff);
};

program
  .action(command)
  .arguments('<file1path> <file2path>')
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format', 'stylish')
  .parse(process.argv);
