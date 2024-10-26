// eslint-disable-next-line import/extensions
import genDiff from '../src/bin/gendiff-differ-json.js';

describe('genDiff', () => {
  test('два объекта с одинаковыми ключами и значениями', () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 1, b: 2 };
    expect(genDiff([obj1, obj2])).toBe('{\n    a: 1\n    b: 2\n}');
  });

  test('два объекта с разными значениями', () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 1, b: 3 };
    expect(genDiff([obj1, obj2])).toBe('{\n    a: 1\n  - b: 2\n  + b: 3\n}');
  });

  test('ключи только в одном объекте', () => {
    const obj1 = { a: 1 };
    const obj2 = { b: 2 };
    expect(genDiff([obj1, obj2])).toBe('{\n  - a: 1\n  + b: 2\n}');
  });

  test('один объект пустой', () => {
    const obj1 = {};
    const obj2 = { a: 1 };
    expect(genDiff([obj1, obj2])).toBe('{\n  + a: 1\n}');
  });

  test('оба объекта пустые', () => {
    const obj1 = {};
    const obj2 = {};
    expect(genDiff([obj1, obj2])).toBe('{\n  \n}');
  });

  test('разные ключи и значения', () => {
    const obj1 = { a: 1, c: 3 };
    const obj2 = { b: 2, c: 4 };
    expect(genDiff([obj1, obj2])).toBe('{\n  - a: 1\n  + b: 2\n  - c: 3\n  + c: 4\n}');
  });
});
