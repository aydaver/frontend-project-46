#!/usr/bin/env node

import { program } from 'commander';

import parser from '../bin/gendiff-parser.js'

const command = (file1path, file2path) => {
    console.log(parser(file1path, file2path));
}

program
    .action(command)
    .arguments('file1path file2path')
    .version('1.0.0')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'output format')
    .parse(process.argv);