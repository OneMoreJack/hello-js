const { strStr } = require('../kmp')

it('kmp', () => {
  expect(strStr('abcabcd', 'abcd')).toBe(3)
  expect(strStr('abcabcfabcabcd', 'abcabcd')).toBe(7)
  expect(strStr('abcabcd', 'abcf')).toBe(-1)
})