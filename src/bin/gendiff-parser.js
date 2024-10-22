#!/usr/bin/env node

import { readFileSync } from 'node:fs';

// eslint-disable-next-line arrow-body-style
const parser = (file1path, file2path) => {
  return [JSON.parse(readFileSync(file1path)), JSON.parse(readFileSync(file2path))];
};

export default parser;
