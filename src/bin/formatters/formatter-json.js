/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-globals */
/* eslint-disable radix */
const jsonObject = {};
const stack = [jsonObject];

function formatValue(value) {
  switch (value.trim()) {
    case 'true': return true;
    case 'false': return false;
    case 'null': return null;
    default:
      return isNaN(value) ? value : Number(value);
  }
}

function formatKey(key) {
  if (key.includes('+')) {
    return `+${key.slice(2)}`;
  } if (key.includes('-')) {
    return `-${key.slice(2)}`;
  }
  return `^${key}`;
}

function adjustStack(level, currentLevel) {
  while (level < currentLevel) {
    stack.pop();
    currentLevel -= 1;
  }
  while (level > currentLevel) {
    const newObj = {};
    stack[stack.length - 1][Object.keys(stack[stack.length - 1]).pop()] = newObj;
    stack.push(newObj);
    currentLevel += 1;
  }
}

function parseLine(line) {
  const parts = line.match(/^(\d+)\s*(.*)$/);
  const level = parseInt(parts[1], 10);
  const data = parts[2];

  const [keyPart, value] = data.split(':').map((part) => part.trim());
  const key = formatKey(keyPart);
  const formattedValue = formatValue(value);

  return { level, key, formattedValue };
}

function json(inputString) {
  const lines = inputString.split('\n').filter((line) => line.trim() !== '');
  let currentLevel = 0;

  for (const line of lines) {
    const { level, key, formattedValue } = parseLine(line);
    adjustStack(level, currentLevel);
    currentLevel = level;

    stack[stack.length - 1][key] = formattedValue;
  }

  return jsonObject;
}

export default json;
