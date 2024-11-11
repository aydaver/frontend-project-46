import fs from 'fs';
import yaml from 'js-yaml';

const parseFile = (filePath, parseFunction) => parseFunction(fs.readFileSync(filePath, 'utf8'));

const parser = (file1path, file2path) => {
  const jsonCheck = file1path.endsWith('json') && file2path.endsWith('json');
  const ymlCheck = file1path.endsWith('yml') && file2path.endsWith('yml');
  const yamlCheck = file1path.endsWith('yaml') && file2path.endsWith('yaml');

  if (jsonCheck) {
    return [
      parseFile(file1path, JSON.parse),
      parseFile(file2path, JSON.parse)];
  }
  if (yamlCheck || ymlCheck) {
    return [
      parseFile(file1path, yaml.load),
      parseFile(file2path, yaml.load)];
  }
  return 'error';
};
export default parser;
