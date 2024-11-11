#!/usr/bin/env node
const result = [];

const spaces = (level) => ' '.repeat((Number(level) + 1) * 4 - 2);

const formatLine = (level, content) => `${spaces(level)}${content}`;

const handleIncreasedLevel = (currentLevel, lineContent) => {
  result.push(`${formatLine(currentLevel, lineContent)} {`);
};

const handleDecreasedLevel = (currentLevel, nextLevel, lineContent) => {
  result.push(formatLine(currentLevel, lineContent));
  if (currentLevel - nextLevel > 1) {
    for (let j = 0; j < currentLevel - nextLevel - 1; j += 1) {
      result.push(`${spaces(currentLevel - j - 1)}  }`);
    }
  }
  result.push(`${spaces(nextLevel)}  }`);
};

const handleSameLevelOrClosure = (currentLevel, nextLevel, lineContent) => {
  result.push(formatLine(currentLevel, lineContent));
  if (currentLevel > 0 && Number.isNaN(nextLevel)) {
    result.push(`${spaces(currentLevel - 1)}  }\n`.repeat(currentLevel));
  }
};

function stylish(str) {
  const array = str.split('\n');
  array.unshift('{');
  array.push('}');

  for (let i = 0; i < array.length; i += 1) {
    const currentLevel = Number(array[i][0]);
    const nextLevel = Number(array[i + 1]?.[0]);
    const lineContent = array[i].slice(1);

    if (array[i] === '}' || array[i] === '{') {
      result.push(array[i]);
    } else if (currentLevel < nextLevel) {
      handleIncreasedLevel(currentLevel, lineContent);
    } else if (currentLevel > nextLevel) {
      handleDecreasedLevel(currentLevel, nextLevel, lineContent);
    } else if (array[i + 1] === '}') {
      handleSameLevelOrClosure(currentLevel, nextLevel, lineContent);
    } else {
      result.push(formatLine(currentLevel, lineContent));
    }
  }

  return result.join('\n');
}

export default stylish;
