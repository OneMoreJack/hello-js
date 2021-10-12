const { ResizingArrayStack } = require('../stack')

describe('Resizing Array Stack', () => {
  it('push, pop, isEmpty, size', () => {
    const stack = new ResizingArrayStack()
    expect(stack.isEmpty()).toBe(true)
    expect(stack.size()).toBe(0)

    stack.push(1)
    stack.push(2)
    stack.push(3)
    expect(stack.isEmpty()).toBe(false)
    expect(stack.size()).toBe(3)
    expect(stack._stack).toEqual([1, 2, 3, null])

    const item = stack.pop()
    expect(item).toBe(3)
    expect(stack._stack).toEqual([1, 2, null, null])
    expect(stack.size()).toBe(2)
  })

  it('resizing', () => {
    const stack = new ResizingArrayStack()
    stack.push(1)
    expect(stack._stack.length).toBe(1)

    stack.push(2)
    expect(stack._stack.length).toBe(2)

    stack.push(3)
    stack.push(4)
    expect(stack._stack.length).toBe(4)

    stack.push(5)
    expect(stack._stack.length).toBe(8)

    stack.pop()
    stack.pop()
    stack.pop()
    stack.pop()
    expect(stack._stack.length).toBe(4)
  })

  it('iterable', () => {
    const stack = new ResizingArrayStack()
    stack.push(1)
    stack.push(2)
    stack.push(3)
    stack.push(4)
    stack.push(5)
    const temp = []
    for (let item of stack) {
      temp.push(item)
    }

    expect(temp).toEqual([5, 4, 3, 2, 1])
  })
})

