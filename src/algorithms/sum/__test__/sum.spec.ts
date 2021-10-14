import { twoSum } from '../twoSum'

describe('Sum', () => {
  test('towSum(只适用于数组中不存在相同元素)', () => {
    expect(twoSum([1, 2, 3, 4, 6, 7], 5)).toBe(2)
    expect(twoSum([1, 2, 3, 4, 6, 7], 30)).toBe(0)
    expect(twoSum([1, 2, 3, 4, 6, 7], 10)).toBe(2)
    expect(twoSum([1, 2, 3, 4, 6, 7, 8], 10)).toBe(3)
  })
})
