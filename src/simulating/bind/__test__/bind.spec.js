import '../bind'

const ø = Object.create(null)
   
const obj = {
  a: 2
}

describe('Test bind', () => {
  test('bind object', () => {
    function getA() {
      return this.a
    }
    const bindFn = getA.mybind(obj)
    expect(bindFn()).toBe(2)
  })

  test('partial function', () => {
    const echoArgs = (...args) => args
    const partialFn = echoArgs.mybind(ø, 1, 2)
    expect(partialFn(4)).toEqual([1,2,4])
  })

  test('new bound function', () => {
    function Create() {
      this.a = 99
    }
    const BoundCreate = Create.mybind(obj)
    const instance = new BoundCreate()
    expect(instance.a).toBe(99)
  })
})