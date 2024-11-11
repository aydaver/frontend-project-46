#!/usr/bin/env node
/* eslint-disable no-use-before-define */
/* eslint-disable max-len */
function gendiff(objects) {
  const result = [];
  const handleValue = (key, value, sign, indent) => {
    const formattedValue = formatValue(key, value, sign, indent);
    result.push(formattedValue);
  };

  const formatValue = (key, value, sign, indent) => ((typeof value === 'object' && value !== null) ? `${indent}${sign} ${key}:` : `${indent}${sign} ${key}: ${value}`);

  const compareValues = (key, value1, value2, indent) => {
    if (value1 === null && value2 !== null) {
      result.push(`${indent}- ${key}: null`);
      handleValue(key, value2, '+', indent);
    } else if (value1 !== null && value2 === null) {
      handleValue(key, value1, '-', indent);
      result.push(`${indent}+ ${key}: null`);
    } else {
      handleValue(key, value1, '-', indent);
      handleValue(key, value2, '+', indent);
    }
  };

  const compareObjects = (obj1, obj2, indent = 0) => {
    const keys = Array.from(new Set([...Object.keys(obj1 || {}), ...Object.keys(obj2 || {})])).sort();

    keys.forEach((key) => {
      const value1 = obj1[key];
      const value2 = obj2[key];

      if (value1 !== undefined && value2 === undefined) {
        handleValue(key, value1, '-', indent);
      } else if (value1 === undefined && value2 !== undefined) {
        handleValue(key, value2, '+', indent);
      } else if (value1 !== value2) {
        if (typeof value1 === 'object' && value1 !== null && typeof value2 === 'object' && value2 !== null) {
          result.push(`${indent}  ${key}:`);
          compareObjects(value1, value2, indent + 1);
        } else {
          compareValues(key, value1, value2, indent);
        }
      } else {
        result.push(`${indent}  ${key}: ${value1}`);
      }
    });
  };

  const [firstObject, secondObject] = objects;
  compareObjects(firstObject, secondObject);
  return result.join('\n');
}

export default gendiff;
