#!/usr/bin/env node
/* eslint-disable max-len */

function gendiff(objects) {
  const firstObject = objects[0];
  const secondObject = objects[1];
  const result = [];

  const compareObjects = (obj1, obj2, indent = 0) => {
    const keys = Array.from(new Set([...Object.keys(obj1 || {}), ...Object.keys(obj2 || {})])).sort();

    keys.forEach((key) => {
      const value1 = obj1[key];
      const value2 = obj2[key];
      if (value1 !== undefined && value2 === undefined) {
        if (typeof value1 === 'object' && value1 !== null) {
          result.push(`${indent}- ${key}:`);
          compareObjects(value1, value1, indent + 1);
        } else {
          result.push(`${indent}- ${key}: ${(value1)}`);
        }
      } else if (value1 === undefined && value2 !== undefined) {
        if (typeof value2 === 'object' && value2 !== null) {
          result.push(`${indent}+ ${key}:`);
          compareObjects(value2, value2, indent + 1);
        } else {
          result.push(`${indent}+ ${key}: ${(value2)}`);
        }
      } else if (value1 === null && value2 !== null) {
        result.push(`${indent}- ${key}: null`);
        result.push(`${indent}+ ${key}: ${value2}`);
      } else if (value2 === null && value1 !== null) {
        result.push(`${indent}- ${key}: ${value1}`);
        result.push(`${indent}+ ${key}: null`);
      } else if (typeof value1 === 'object' && value1 !== null && typeof value2 === 'object' && value2 !== null && !Array.isArray(value1) && !Array.isArray(value2)) {
        result.push(`${indent}  ${key}:`);
        compareObjects(value1, value2, indent + 1);
      } else if (value1 === value2) {
        result.push(`${indent}  ${key}: ${(value1)}`);
      } else {
        if (typeof value1 === 'object' && value1 !== null) {
          result.push(`${indent}- ${key}:`);
          compareObjects(value1, value1, indent + 1);
        } else {
          result.push(`${indent}- ${key}: ${(value1)}`);
        }
        if (typeof value2 === 'object' && value2 !== null) {
          result.push(`${indent}+ ${key}:`);
          compareObjects(value2, value2, indent + 1);
        } else if (typeof value2 !== 'object') {
          result.push(`${indent}+ ${key}: ${(value2)}`);
        } else if (typeof value1 !== 'object') {
          result.push(`${indent}- ${key}: ${(value1)}`);
        }
      }
    });
  };

  compareObjects(firstObject, secondObject);
  return result.join('\n');
}

export default gendiff;
