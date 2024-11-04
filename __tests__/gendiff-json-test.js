// eslint-disable-next-line import/extensions
import gendiff from '../src/bin/gendiff-differ-json.js';

describe('Тесты для функции gendiff', () => {
  test('Тест на равные объекты', () => {
    const object1 = { a: 1, b: 2 };
    const object2 = { a: 1, b: 2 };
    const result = gendiff([object1, object2]);
    expect(result).toBe('0  a: 1\n0  b: 2');
  });

  test('Тест на разные объекты', () => {
    const object1 = { a: 1, b: 2 };
    const object2 = { a: 1, b: 3 };
    const result = gendiff([object1, object2]);
    expect(result).toBe('0  a: 1\n0- b: 2\n0+ b: 3');
  });

  test('Тест на отсутствие ключа в первом объекте', () => {
    const object1 = { a: 1 };
    const object2 = { a: 1, b: 2 };
    const result = gendiff([object1, object2]);
    expect(result).toBe('0  a: 1\n0+ b: 2');
  });

  test('Тест на отсутствие ключа во втором объекте', () => {
    const object1 = { a: 1, b: 2 };
    const object2 = { a: 1 };
    const result = gendiff([object1, object2]);
    expect(result).toBe('0  a: 1\n0- b: 2');
  });

  test('Тест на вложенные объекты', () => {
    const object1 = { a: { b: 3 } };
    const object2 = { a: { b: 4 } };
    const result = gendiff([object1, object2]);
    expect(result).toBe('0  a:\n1- b: 3\n1+ b: 4');
  });

  test('Тест на разные типы значений', () => {
    const object1 = { a: 1, b: 'string' };
    const object2 = { a: 1, b: 2 };
    const result = gendiff([object1, object2]);
    expect(result).toBe('0  a: 1\n0- b: string\n0+ b: 2');
  });

  test('Тест на значения null', () => {
    const object1 = { a: 1, b: null };
    const object2 = { a: 1, b: 2 };
    const result = gendiff([object1, object2]);
    expect(result).toBe('0  a: 1\n0- b: null\n0+ b: 2');
  });
});
