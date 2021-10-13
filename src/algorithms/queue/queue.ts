
class Node<T> {
  value: T | undefined = undefined
  next: Node<T> | null = null
}

export class Queue<T> {
  private first: Node<T> | null = null
  private last: Node<T> | null = null
  private N: number = 0

  public isEmpty(): boolean {
    return this.N === 0
  }

  public size(): number {
    return this.N
  }

  public enqueue(item: T) {
    let oldLast = this.last
    let last = new Node<T>()
    last.value = item
    last.next = null
    this.last = last

    if (this.isEmpty()) this.first = this.last
    else (oldLast as Node<T>).next = this.last
    this.N++
  }

  public dequeue(): T | undefined {
    if (!this.first) return undefined

    const item = this.first.value
    this.first = this.first?.next
    this.N--
    if (this.isEmpty()) this.last = null
    return item
  }

  public [Symbol.iterator]() {
    let node = this.first
    return {
      next: () => {
        let iterateObj = {
          value: node == null ? undefined : node.value,
          done: node == null
        }

        if (node) node = node.next
        return iterateObj
      }
    }
  }
}