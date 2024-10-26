#!/usr/bin/env node

import fs from 'fs';

import yaml from 'js-yaml';

// eslint-disable-next-line arrow-body-style
const parser = (file1path, file2path) => {
  if (file1path.endsWith('json') && file2path.endsWith('json')) {
    return [JSON.parse(fs.readFileSync(file1path)), JSON.parse(fs.readFileSync(file2path))];
  }
  if ((file1path.endsWith('yml') && file2path.endsWith('yml')) || (file1path.endsWith('yaml') && file2path.endsWith('yaml'))) {
    return [yaml.load(fs.readFileSync(file1path, 'utf8')), yaml.load(fs.readFileSync(file2path, 'utf8'))];
  }
  return 'lol: kek';
};

export default parser;
