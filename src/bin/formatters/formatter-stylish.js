#!/usr/bin/env node
function stylish(str) {
  const array = str.split('\n');
  array.unshift('{');
  array.push('}');
  const result = [];
  const spaces = (level) => ' '.repeat((Number(level) + 1) * 4 - 2);
  const handleOpeningBraces = (currentLevel, lineContent) => {
    result.push(`${spaces(currentLevel)}${lineContent} {`);
  };
  const handleClosingBraces = (currentLevel, nextLevel, lineContent) => {
    result.push(`${spaces(currentLevel)}${lineContent}`);
    if (currentLevel - nextLevel > 1) {
      for (let j = 0; j < currentLevel - nextLevel - 1; j += 1) {
        result.push(`${spaces(currentLevel - 1)}  }`);
      }
    }
    result.push(`${spaces(nextLevel)}  }`);
  };
  const handleEqualLevels = (currentLevel, lineContent) => {
    result.push(`${spaces(currentLevel)}${lineContent}`);
  };
  const handleNextLineIsClosing = (currentLevel, lineContent) => {
    result.push(`${spaces(currentLevel)}${lineContent}`);
    if (currentLevel > 0) {
      result.push(`${spaces(currentLevel - 1)}  }`.repeat(currentLevel));
    }
  };
  for (let i = 0; i < array.length; i += 1) {
    const currentLevel = Number(array[i][0]);
    const nextLevel = Number(array[i + 1]?.[0]);
    const lineContent = array[i].slice(1);
    if (array[i] === '}' || array[i] === '{') {
      result.push(array[i]);
    } else if (currentLevel < nextLevel) {
      handleOpeningBraces(currentLevel, lineContent);
    } else if (currentLevel > nextLevel) {
      handleClosingBraces(currentLevel, nextLevel, lineContent);
    } else if (array[i + 1] === '}') {
      handleNextLineIsClosing(currentLevel, lineContent);
    } else {
      handleEqualLevels(currentLevel, lineContent);
    }
  }
  return result.join('\n');
}

export default stylish;
