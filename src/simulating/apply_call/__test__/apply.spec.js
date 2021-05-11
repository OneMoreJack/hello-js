import '../apply'
import '../call'

const obj = {
  a: 'hello:'
}

function greet(...args) {
  return this.a + args.join(',')
}

describe('Test call & apply', () => {
  test('test call', () => {
    const greeting = greet.mycall(obj, 'jack')
    expect(greeting).toBe('hello:jack')
  })

  test('test apply', () => {
    const greeting = greet.myapply(obj, ['A', 'B'])
    expect(greeting).toBe('hello:A,B')
  })
})