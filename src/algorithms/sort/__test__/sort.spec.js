const { bubble, select, insert, heapSort, mergeSort, hellSort, countingSort } = require('../sort')

const test1 = func => {
  return () => {
    expect(func([9, 5, 2, 8, 1, 7])).toEqual([1, 2, 5, 7, 8, 9])
  }
}

const test2 = func => {
  return () => {
    expect(func([1, 0, 9, 12, 4, 9, 6])).toEqual([0, 1, 4, 6, 9, 9, 12])
  }
}

describe('冒泡排序', () => {
  it('用例1', test1(bubble))
  it('用例2', test2(bubble))
})


describe('选择排序', () => {
  it('用例1', test1(select))
  it('用例2', test2(select))
})

describe('插入排序', () => {
  it('用例1', test1(insert))
  it('用例2', test2(insert))
})

describe('堆排序', () => {
  it('用例1', test1(heapSort))
  it('用例2', test2(heapSort))
})

describe('归并排序', () => {
  it('用例1', test1(mergeSort))
  it('用例2', test2(mergeSort))
})

describe('希尔排序', () => {
  it('用例1', test1(hellSort))
  it('用例2', test2(hellSort))
})

describe('计数排序', () => {
  it('用例1', test1(countingSort))
  it('用例2', test2(countingSort))
})
