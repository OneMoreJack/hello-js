const { bubble, select } = require('../sort')

describe('冒泡排序', () => {
  it('用例1', () => {
    expect(bubble([9, 5, 2, 8, 1, 7])).toEqual([1, 2, 5, 7, 8, 9])
  })

  it('用例2', () => {
    expect(bubble([1, 0, 9, 12, 4, 9, 6])).toEqual([0, 1, 4, 6, 9, 9, 12])
  })
})


describe('选择排序', () => {
  it('用例1', () => {
    expect(select([9, 5, 2, 8, 1, 7])).toEqual([1, 2, 5, 7, 8, 9])
  })

  it('用例2', () => {
    expect(select([1, 0, 9, 12, 4, 9, 6])).toEqual([0, 1, 4, 6, 9, 9, 12])
  })
})