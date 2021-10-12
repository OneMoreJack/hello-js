
// 《算法4》 
// 算法 1.1　下压（LIFO）栈（能够动态调整数组大小的实现）Page88
export class ResizingArrayStack {
  _stack = [null]
  N = 0

  isEmpty() {
    return this.N === 0
  }

  size() {
    return this.N
  }

  resize(max) {
    const temp = Array(max).fill(null)
    for (let i = 0; i < this.N; i++) {
      temp[i] = this._stack[i]
    }
    this._stack = temp
  }

  push(item) {
    if (this.N === this._stack.length) this.resize(this.N * 2)
    this._stack[this.N++] = item
  }

  pop() {
    const item = this._stack[--this.N]
    this._stack[this.N] = null

    if (this.N > 0 && this.N < this._stack.length / 4) 
      this.resize(Math.floor(this._stack.length / 2))

    return item
  }

  /**
   * 部署[Symbol.iterator]，使栈可使用 for...of 遍历
   * 遍历也遵循LIFO
   */
  [Symbol.iterator]() {
    let len = this.N
    return {
      next: () => {
        return {
          value: this._stack[--len],
          done: len < 0,
        }
      }
    }
  }
}
