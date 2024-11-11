#!/usr/bin/env node
/* eslint-disable no-use-before-define */
/* eslint-disable max-len */
function gendiff(objects) {
  const result = [];
  const handleValue = (key, value, sign, indent) => {
    if (typeof value === 'object' && value !== null) {
      result.push(`${indent}${sign} ${key}:`);
      compareObjects(value, value, indent + 1);
    } else result.push(`${indent}${sign} ${key}: ${value}`);
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
      } else if (value1 === null && value2 !== null) {
        result.push(`${indent}- ${key}: null`);
        handleValue(key, value2, '+', indent);
      } else if (value2 === null && value1 !== null) {
        handleValue(key, value1, '-', indent);
        result.push(`${indent}+ ${key}: null`);
      } else if (typeof value1 === 'object' && value1 !== null && typeof value2 === 'object' && value2 !== null) {
        result.push(`${indent}  ${key}:`);
        compareObjects(value1, value2, indent + 1);
      } else if (value1 === value2) result.push(`${indent}  ${key}: ${value1}`);
      else {
        handleValue(key, value1, '-', indent);
        handleValue(key, value2, '+', indent);
      }
    });
  };
  const firstObject = objects[0];
  const secondObject = objects[1];
  compareObjects(firstObject, secondObject);
  return result.join('\n');
}
export default gendiff;
