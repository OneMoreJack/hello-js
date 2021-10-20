import { QuickFind } from '../quick-find'
import { QuickUnion } from '../quick-union'
import { WeightedQuickUnion } from '../weighted-quick-union'
import { UF } from '../base-uf'

const getTestFunc = (ctr: new (n: number) => UF) => {
  return () => {
    const uf = new ctr(10)
    const inputs = [
      [4, 3],
      [3, 8],
      [6, 5],
      [9, 4],
      [2, 1],
      [8, 9],
      [5, 0],
      [7, 2],
      [6, 1],
      [1, 0],
      [6, 7],
    ]
  
    inputs.forEach(([p, q]) => {
      uf.union(p, q)
    })

    test('connected', () => {
      expect(uf.connected(1, 4)).toBe(false)
      expect(uf.connected(3, 5)).toBe(false)

      expect(uf.connected(3, 4)).toBe(true)
      expect(uf.connected(0, 7)).toBe(true)
    })

    test('getCount', () => {
      expect(uf.getCount()).toBe(2)
    })
  }
}

describe('Union-find', () => {
  describe('quick-find', getTestFunc(QuickFind))
  describe('quick-union', getTestFunc(QuickUnion))
  describe('weighted-quick-find', getTestFunc(WeightedQuickUnion))
})