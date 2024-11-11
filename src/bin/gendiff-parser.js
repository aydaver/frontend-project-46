import fs from 'fs';
import yaml from 'js-yaml';

const parser = (file1path, file2path) => {
  if (file1path.endsWith('json') && file2path.endsWith('json')) {
    const resultArray = [
      JSON.parse(fs.readFileSync(file1path)),
      JSON.parse(fs.readFileSync(file2path))];
    return resultArray;
  }
  if (file1path.endsWith('yml') && file2path.endsWith('yml')) {
    const resultArray = [
      yaml.load(fs.readFileSync(file1path, 'utf8')),
      yaml.load(fs.readFileSync(file2path, 'utf8'))];
    return resultArray;
  }
  if (file1path.endsWith('yaml') && file2path.endsWith('yaml')) {
    const resultArray = [
      yaml.load(fs.readFileSync(file1path, 'utf8')),
      yaml.load(fs.readFileSync(file2path, 'utf8'))];
    return resultArray;
  }
  return 'error';
};

export default parser;
