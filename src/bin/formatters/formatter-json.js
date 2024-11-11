/* eslint-disable no-restricted-globals */
/* eslint-disable radix */
function json(inputString) {
  const lines = inputString.split('\n').filter((line) => line.trim() !== '');
  const jsonObject = {};
  const stack = [jsonObject];
  let currentLevel = 0;
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    const parts = line.match(/^(\d+)\s*(.*)$/);
    const level = parseInt(parts[1], 10);
    const data = parts[2];
    while (level < currentLevel) {
      stack.pop();
      currentLevel -= 1;
    } while (level > currentLevel) {
      const newObj = {};
      stack[stack.length - 1][Object.keys(stack[stack.length - 1]).pop()] = newObj;
      stack.push(newObj);
      currentLevel += 1;
    } const [keyPart, value] = data.split(':');
    const key = keyPart.trim();
    let formattedValue = value.trim();
    let formattedKey = key;
    if (key.includes('+')) {
      formattedKey = `+${key.slice(2)}`;
    } else if (key.includes('-')) {
      formattedKey = `-${key.slice(2)}`;
    } else {
      formattedKey = `^${key}`;
    } if (value === ' true') {
      formattedValue = true;
    } else if (value === ' false') {
      formattedValue = false;
    } else if (value === ' null') {
      formattedValue = null;
    } else if (!isNaN(value)) {
      formattedValue = Number(formattedValue);
    } stack[stack.length - 1][formattedKey] = formattedValue;
  }
  return jsonObject;
}
export default json;
