/* eslint-disable max-len */
function stylish(str) {
  const array = str.split('\n');
  array.splice(0, 0, '{');
  array.push('}');
  const result = [];
  const spaces = (string) => {
    const num = ((Number(string[0]) + 1) * 4) - 2;
    return num;
  };
  // eslint-disable-next-line no-restricted-syntax
  for (let i = 0; i < array.length; i += 1) {
    if (array[i] === '}' || array[i] === '{') {
      result.push(`${array[i]}`);
    } else if (array[i - 1] === '{') {
      result.push(' '.repeat(spaces(array[i])).concat(`${array[i].slice(1)} {`));
    } else if (array[i + 1] === '}') {
      result.push(' '.repeat(spaces(array[i])).concat(`${array[i].slice(1)}\n`.concat(' '.repeat(spaces(array[i]) - 2)).concat('}')));
    } else if (Number(array[i][0]) > Number(array[i + 1][0]) && Number(array[i][0]) > Number(array[i - 1][0])) {
      if ((Number(array[i][0]) - Number(array[i + 1][0])) > 1) {
        result.push(' '.repeat(spaces(array[i])).concat(`${array[i].slice(1)}\n`.concat(' '.repeat(spaces(array[i]) - 2)).concat('}')));
        let counter = spaces(array[i]) - 2;
        for (let ind = 1; ind < (Number(array[i][0]) - Number(array[i + 1][0])); ind += 1) {
          counter -= 4;
          result.push(' '.repeat(counter).concat('}'));
        }
      } else if (!array[i].includes(':')) {
        result.push(' '.repeat(spaces(array[i])).concat(`${array[i].slice(1)}`));
      } else {
        result.push(' '.repeat(spaces(array[i])).concat(`${array[i].slice(1)}\n`.concat(' '.repeat(spaces(array[i]) - 2)).concat('}')));
      }
    } else if (Number(array[i][0]) < Number(array[i + 1][0]) && Number(array[i][0]) < Number(array[i - 1][0])) {
      result.push(' '.repeat(spaces(array[i])).concat(`${array[i].slice(1)} {`));
    } else if (Number(array[i][0]) > Number(array[i + 1][0]) && Number(array[i][0]) < Number(array[i - 1][0])) {
      if ((Number(array[i][0]) - Number(array[i + 1][0])) > 1) {
        result.push(' '.repeat(spaces(array[i])).concat(`${array[i].slice(1)}\n`.concat(' '.repeat(spaces(array[i]) - 2)).concat('}')));
        let counter = spaces(array[i]) - 2;
        for (let ind = 1; ind < (Number(array[i][0]) - Number(array[i + 1][0])); ind += 1) {
          counter -= 4;
          result.push(' '.repeat(counter).concat('}'));
        }
      } else {
        result.push(' '.repeat(spaces(array[i])).concat(`${array[i].slice(1)}\n`.concat(' '.repeat(spaces(array[i]) - 2)).concat('}')));
      }
    } else if (Number(array[i][0]) < Number(array[i + 1][0]) && Number(array[i][0]) > Number(array[i - 1][0])) {
      result.push(' '.repeat(spaces(array[i])).concat(`${array[i].slice(1)} {`));
    } else if (Number(array[i][0]) === Number(array[i + 1][0])) {
      result.push(' '.repeat(spaces(array[i])).concat(`${array[i].slice(1)}`));
    } else if (Number(array[i][0]) < Number(array[i + 1][0]) && Number(array[i][0]) === Number(array[i - 1][0])) {
      result.push(' '.repeat(spaces(array[i])).concat(`${array[i].slice(1)} {`));
    } else if (Number(array[i][0]) > Number(array[i + 1][0]) && Number(array[i][0]) === Number(array[i - 1][0])) {
      if ((Number(array[i][0]) - Number(array[i + 1][0])) > 1) {
        result.push(' '.repeat(spaces(array[i])).concat(`${array[i].slice(1)}\n`.concat(' '.repeat(spaces(array[i]) - 2)).concat('}')));
        let counter = spaces(array[i]) - 2;
        for (let ind = 1; ind < (Number(array[i][0]) - Number(array[i + 1][0])); ind += 1) {
          counter -= 4;
          result.push(' '.repeat(counter).concat('}'));
        }
      } else if (!array[i].includes(':')) {
        result.push(' '.repeat(spaces(array[i])).concat(`${array[i].slice(1)}`));
      } else {
        result.push(' '.repeat(spaces(array[i])).concat(`${array[i].slice(1)}\n`.concat(' '.repeat(spaces(array[i]) - 2)).concat('}')));
      }
    }
  }
  return result.join('\n');
}
export default stylish;
