import { quickSort } from '../quick-sort'

const getTestFunc = (func: (a: number[]) => number[]) => {
  return () => {
    expect(func([9, 5, 2, 8, 1, 7])).toEqual([1, 2, 5, 7, 8, 9]);
    expect(func([1, 0, 9, 12, 4, 9, 6])).toEqual([0, 1, 4, 6, 9, 9, 12]);
    expect(func([13, 24, 0, 6, 88, 2, 36])).toEqual([0, 2, 6, 13, 24, 36, 88]);
    expect(func([2, 1, 0, 1])).toEqual([0, 1, 1, 2]);
  };
};

describe('快速排序', () => {
  test('原地快排--基础版', getTestFunc(quickSort))
})

