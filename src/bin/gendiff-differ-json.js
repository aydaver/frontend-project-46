#!/usr/bin/env node
/* eslint-disable no-use-before-define */
/* eslint-disable max-len */
function gendiff(objects) {
  const result = [];

  const compareObjects = (obj1, obj2, indent = 0) => {
    const keys = Array.from(new Set([...Object.keys(obj1 || {}), ...Object.keys(obj2 || {})])).sort();
    keys.forEach((key) => compareKey(key, obj1[key], obj2[key], indent));
  };

  const compareKey = (key, value1, value2, indent) => {
    if (value1 !== undefined && value2 === undefined) {
      handleValue(key, value1, '-', indent);
    } else if (value1 === undefined && value2 !== undefined) {
      handleValue(key, value2, '+', indent);
    } else if (value1 === null && value2 !== null) {
      handleNullValue(key, value2, indent);
    } else if (value2 === null && value1 !== null) {
      handleNullValue(key, value1, indent, true);
    } else if (typeof value1 === 'object' && typeof value2 === 'object') {
      handleObjectValue(key, value1, value2, indent);
    } else if (value1 !== value2) {
      handleValue(key, value1, '-', indent);
      handleValue(key, value2, '+', indent);
    } else {
      result.push(`${indent}  ${key}: ${value1}`);
    }
  };

  const handleValue = (key, value, sign, indent) => {
    if (typeof value === 'object' && value !== null) {
      result.push(`${indent}${sign} ${key}:`);
      compareObjects(value, value, indent + 1);
    } else {
      result.push(`${indent}${sign} ${key}: ${value}`);
    }
  };

  const handleNullValue = (key, value, indent, isRemoving = false) => {
    if (isRemoving) {
      result.push(`${indent}- ${key}: null`);
    } else {
      result.push(`${indent}- ${key}: null`);
      handleValue(key, value, '+', indent);
    }
  };

  const handleObjectValue = (key, value1, value2, indent) => {
    result.push(`${indent}  ${key}:`);
    compareObjects(value1, value2, indent + 1);
  };

  const [firstObject, secondObject] = objects;
  compareObjects(firstObject, secondObject);
  return result.join('\n');
}
export default gendiff;
