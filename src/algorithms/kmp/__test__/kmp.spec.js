const { strStr } = require('../kmp')

describe('kmp', () => {
  it('用例1', () => {
    expect(strStr('abcabcd', 'abcd')).toBe(3)
  })

  it('用例2', () => {
    expect(strStr('abcabcfabcabcd', 'abcabcd')).toBe(7)
  })

  it('用例3', () => {
    expect(strStr('abcabcd', 'abcf')).toBe(-1)
  })
})