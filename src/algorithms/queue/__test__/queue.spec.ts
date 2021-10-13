import { Queue } from '../queue'

describe('Queue', () => {
  test('enqueue, dequeue, isEmpty, size', () => {
    const queue = new Queue<number>()
    expect(queue.isEmpty()).toBe(true)

    queue.enqueue(1)
    queue.enqueue(2)
    queue.enqueue(3)
    expect(queue.isEmpty()).toBe(false)
    expect(queue.size()).toBe(3)

    const item = queue.dequeue()
    expect(item).toBe(1)
    expect(queue.size()).toBe(2)
  })

  test('iterable', () => {
    let temp: number[] = []
    const queue = new Queue<number>()
    queue.enqueue(1)
    queue.enqueue(2)
    queue.enqueue(3)
    queue.enqueue(4)
    queue.enqueue(5)
    for (let item  of queue) {
      temp.push(item as number)
    }
    expect(temp).toEqual([1, 2, 3, 4, 5])
  })
})

