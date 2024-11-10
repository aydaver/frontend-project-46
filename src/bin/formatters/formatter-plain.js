/* eslint-disable max-len */
const arrify = (string) => string.split(' ');

const deepLvl = (str) => Number(str[0]);

const getPath = (array, string) => {
  let startIndex = array.indexOf(string);
  const result = [arrify(string)[1].slice(0, -1)];

  if (deepLvl(string) === 0) {
    return result[0];
  }

  for (let i = startIndex - 1; deepLvl(array[i]) >= 0; i -= 1) {
    if (deepLvl(array[i]) === 0 && arrify(array[i])[2] !== undefined) {
      result.push(arrify(array[i])[2].slice(0, -1));
      break;
    } else if (deepLvl(array[startIndex]) > deepLvl(array[i])) {
      result.push(arrify(array[i])[2].slice(0, -1));
      startIndex = i;
    }
  }
  return result.reverse().join('.');
};

const typiser = (string) => {
  if (string === 'null' || string === 'true' || string === 'false') {
    return string;
  }
  return `'${string}'`;
};

function plain(string) {
  const array = string.split('\n');
  const result = [];

  for (let i = 0; i < array.length; i += 1) {
    const [, property, ...rest] = arrify(array[i]);

    if (array[i].includes('+')) {
      const prev = arrify(array[i - 1]);

      if (property === prev[1]) {
        result.push(`Property ${getPath(array, array[i])} was updated. From ${typiser(prev[2])} to ${typiser(rest.join(' '))}`);
      } else if (deepLvl(array[i]) < deepLvl(array[i - 1])) {
        if (deepLvl(array[i]) < deepLvl(array[i + 1])) {
          result.push(`Property ${getPath(array, array[i])} was added. With value: [complex value]`);
        } else {
          const filterArr = array.filter((str) => str.startsWith(array[i][0]) && arrify(str)[1] === property);
          const value = filterArr[filterArr.indexOf(array[i])];
          if (filterArr.length === 2) {
            result.push(`Property ${getPath(array, array[i])} was updated. From [complex value] to ${typiser(value)}`);
          }
        }
      } else {
        const isNewProperty = deepLvl(array[i]) >= deepLvl(array[i + 1]);
        result.push(`Property ${getPath(array, array[i])} was added. With value: ${isNewProperty ? typiser(rest.join(' ')) : '[complex value]'}`);
      }
    } else if (array[i].includes('-')) {
      const next = arrify(array[i + 1]);
      if (property !== next[1]) {
        const filterArr = array.filter((str) => str.startsWith(array[i][0]) && arrify(str)[1] === property);
        if (filterArr.length !== 2) {
          result.push(`Property ${getPath(array, array[i])} was removed.`);
        }
      }
    }
  }
  return result.join('\n');
}

export default plain;
