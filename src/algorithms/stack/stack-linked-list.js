// 《算法4》 
// 算法 1.2　下压堆栈（链表实现）Page94
export class LinkedListStack {
  first = null
  N = 0

  isEmpty() {
    return this.N === 0
  }

  size() {
    return this.N
  }

  push(value) {
    const oldNode = this.first
    const first = new Node()
    first.value = value
    first.next = oldNode

    this.first = first
    this.N++
  }

  pop() {
    const item = this.first.value
    this.first = item.next
    this.N--
    return item
  }

  /**
   * 部署[Symbol.iterator]，使栈可使用 for...of 遍历
   * 遍历也遵循LIFO
   */
   [Symbol.iterator]() {
    let node = this.first
    return {
      next: () => {
        const iterateObj = {
          value: node == null ? undefined : node.value,
          done: node == null
        }

        if (node) node = node.next
        return iterateObj
      }
    }
  }
}

class Node {
  constructor(value = undefined, next = null) {
    this.value = value
    this.next = next
  }
}
