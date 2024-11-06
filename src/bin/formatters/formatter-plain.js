/* eslint-disable max-len */
const arrify = (string) => string.split(' ');

const getPath = (array, string) => {
  let startIndex = array.indexOf(string);
  const deepLvl = (str) => Number(str[0]);
  const result = [arrify(string)[1].slice(0, -1)];
  if (deepLvl(string) === 0) {
    return (arrify(string)[1].slice(0, -1));
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
  const deepLvl = (str) => Number(str[0]);
  // eslint-disable-next-line no-restricted-syntax
  for (let i = 0; i < array.length; i += 1) {
    if (array[i].includes('+')) {
      if (arrify(array[i])[1] === arrify(array[i - 1])[1]) {
        result.push(`Property ${getPath(array, array[i])} was updated. From ${typiser(arrify(array[i - 1])[2])} to ${typiser(arrify(array[i]).slice(2).join(' '))}`);
      } else if (arrify(array[i])[1] !== arrify(array[i - 1])[1] && deepLvl(array[i]) < deepLvl(array[i - 1])) {
        if (deepLvl(array[i]) < deepLvl(array[i + 1])) {
          result.push(`Property ${getPath(array, array[i])} was added. With value: [complex value]`);
        } else {
          const filterArr = array.filter((str) => str.startsWith(array[i][0]) && arrify(str)[1] === arrify(array[i])[1]);
          const value = filterArr[filterArr.indexOf(array[i])];
          if (filterArr.length === 2) {
            result.push(`Property ${getPath(array, array[i])} was updated. From [complex value] to ${typiser(value)}`);
          }
        }
      } else if (arrify(array[i])[1] !== arrify(array[i - 1])[1]) {
        if (deepLvl(array[i]) >= deepLvl(array[i + 1])) {
          result.push(`Property ${getPath(array, array[i])} was added. With value: ${typiser(arrify(array[i]).slice(2).join(' '))}`);
        } else if (deepLvl(array[i]) < deepLvl(array[i + 1])) {
          result.push(`Property ${getPath(array, array[i])} was added. With value: [complex value]`);
        }
      }
    } else if (array[i].includes('-')) {
      if (arrify(array[i])[1] !== arrify(array[i + 1])[1]) {
        const filterArr = array.filter((str) => str.startsWith(array[i][0]) && arrify(str)[1] === arrify(array[i])[1]);
        if (filterArr.length !== 2) {
          result.push(`Property ${getPath(array, array[i])} was removed.`);
        }
      }
    }
  }
  return result.join('\n');
}
export default plain;
