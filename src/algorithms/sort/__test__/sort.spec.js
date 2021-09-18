const { bubble, select, insert, heapSort, mergeSort } = require('../sort')

const test1 = () => {
  expect(bubble([9, 5, 2, 8, 1, 7])).toEqual([1, 2, 5, 7, 8, 9])
}

const test2 = () => {
  expect(bubble([1, 0, 9, 12, 4, 9, 6])).toEqual([0, 1, 4, 6, 9, 9, 12])
}

describe('冒泡排序', () => {
  it('用例1', test1)
  it('用例2', test2)
})


describe('选择排序', () => {
  it('用例1', test1)
  it('用例2', test2)
})

describe('插入排序', () => {
  it('用例1', test1)
  it('用例2', test2)
})

describe('堆排序', () => {
  it('用例1', test1)
  it('用例2', test2)
})

describe('归并排序', () => {
  it('用例1', test1)
  it('用例2', test2)
})

describe('希尔排序', () => {
  it('用例1', test1)
  it('用例2', test2)
})
