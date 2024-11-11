const arr = (string) => string.split(' ');
const deepLvl = (str) => Number(str[0]);
const getPath = (array, string) => {
  let startIndex = array.indexOf(string);
  const result = [arr(string)[1].slice(0, -1)];
  if ((string) === 0) {
    return result[0];
  }
  for (let i = startIndex - 1; deepLvl(array[i]) >= 0; i -= 1) {
    if (deepLvl(array[i]) === 0 && arr(array[i])[2] !== undefined) {
      result.push(arr(array[i])[2].slice(0, -1));
      break;
    } else if (deepLvl(array[startIndex]) > deepLvl(array[i])) {
      result.push(arr(array[i])[2].slice(0, -1));
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

const handleAddition = (array, i, prop, rest) => {
  const isNewProperty = deepLvl(array[i]) >= deepLvl(array[i + 1]);
  return `Property ${getPath(array, array[i])} was added. With value: ${isNewProperty ? typiser(rest.join(' ')) : '[complex value]'}`;
};

const handleUpdate = (array, i, prop, rest) => {
  const prev = arr(array[i - 1]);
  return `Property ${getPath(array, array[i])} was updated. From ${typiser(prev[2])} to ${typiser(rest.join(' '))}`;
};

const handleComplexUpdate = (array, i, prop, filterArr) => {
  const value = arr(filterArr[filterArr.indexOf(array[i])])[2];
  return `Property ${getPath(array, array[i])} was updated. From [complex value] to ${typiser(value)}`;
};

const handleRemoval = (array, i, prop, next, filterArr) => {
  if (prop !== next[1] && filterArr.length !== 2) {
    return `Property ${getPath(array, array[i])} was removed.`;
  }
  return null;
};

function plain(string) {
  const array = string.split('\n');
  const result = [];
  for (let i = 0; i < array.length; i += 1) {
    const [, prop, ...rest] = arr(array[i]);
    const filterArr = array.filter((str) => str.startsWith(array[i][0]) && arr(str)[1] === prop);
    if (array[i].includes('+')) {
      const prev = arr(array[i - 1]);
      if (prop === prev[1]) {
        result.push(handleUpdate(array, i, prop, rest));
      } else if (deepLvl(array[i]) < deepLvl(array[i - 1])) {
        if (deepLvl(array[i]) < deepLvl(array[i + 1])) {
          result.push(`Property ${getPath(array, array[i])} was added. With value: [complex value]`);
        } else if (filterArr.length === 2) {
          result.push(handleComplexUpdate(array, i, prop, filterArr));
        }
      } else {
        result.push(handleAddition(array, i, prop, rest));
      }
    } else if (array[i].includes('-')) {
      const next = arr(array[i + 1]);
      const removalMessage = handleRemoval(array, i, prop, next, filterArr);
      if (removalMessage) {
        result.push(removalMessage);
      }
    }
  }
  return result.join('\n');
}

export default plain;
