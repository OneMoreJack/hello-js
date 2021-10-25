import { knapsack, knapsack1 } from '../knapsack'

function getTestFunc(fn: any) {
  return () => {
    expect(fn([2, 1, 3], [4, 2, 3], 4)).toBe(6)
    expect(fn([3, 1, 2, 2, 1], [10, 3, 9, 5, 6], 6)).toBe(25)
  }
}


describe('01背包问题', () => {
  test('二维数组版', getTestFunc(knapsack))
  test('空间优化版', getTestFunc(knapsack1))
})
