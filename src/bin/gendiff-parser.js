import fs from 'fs';
import yaml from 'js-yaml';

const parser = (file1path, file2path) => {
  if (file1path.endsWith('json') && file2path.endsWith('json')) {
    const resultArray = [
      JSON.parse(fs.readFileSync(file1path)),
      JSON.parse(fs.readFileSync(file2path))];
    return resultArray;
  }
  if (file1path.endsWith('yml' || 'yaml') && file2path.endsWith('yml' || 'yaml')) {
    const resultArray = [
      yaml.load(fs.readFileSync(file1path, 'utf8')),
      yaml.load(fs.readFileSync(file2path, 'utf8'))];
    return resultArray;
  }
  return 'error';
};

export default parser;
