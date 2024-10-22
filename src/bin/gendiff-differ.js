#!/usr/bin/env node

function gendiff(array) {
  const obj1 = array[0];
  const obj2 = array[1];
  const keys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);
  const sortedKeys = Array.from(keys).sort();

  const result = [];

  sortedKeys.forEach((key) => {
    const val1 = obj1[key];
    const val2 = obj2[key];

    if (val1 === undefined) {
      // Ключ только в obj2
      result.push(`+ ${key}: ${val2}`);
    } else if (val2 === undefined) {
    // Ключ только в obj1
      result.push(`- ${key}: ${val1}`);
    } else if (val1 !== val2) {
      // Ключ есть в обоих, но значения разные
      result.push(`- ${key}: ${val1}`);
      result.push(`+ ${key}: ${val2}`);
    } else {
      result.push(`  ${key}: ${val1}`);
    }
  });

  return '{\n  '.concat(result.join('\n  ')).concat('\n}');
}

export default gendiff;
