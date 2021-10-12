const { sum }  = require('../queue')

describe('Queue', () => {
  it('sum', () => {
    expect(sum(1, 2)).toBe(3)
    expect(sum(2, 4)).toBe(6)
  })
})

