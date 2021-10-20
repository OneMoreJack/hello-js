
export interface UNION_FIND {
  getCount(): number
  find(p: number): number
  connected(p: number, q: number): boolean
  union(p: number, q: number): void
}

export class WeightedQuickUnionPathCompression implements UNION_FIND {
  readonly N: number
  private count: number
  private parent: number[] = []
  private size: number[] = []

  constructor(n: number) {
    this.N = this.count = n
    for (let i = 0; i < n; i++) {
      this.parent[i] = i
      this.size[i] = 1
    }
  }

  public getCount(): number {
    return this.count
  }

  public find(p: number): number {
    this.validate(p)
    let root: number = p
    // 寻找根节点
    while (root !== this.parent[root]) {
      root = this.parent[root]
    }
    // 压缩路径
    while (p !== root) {
      let newp: number = this.parent[p]
      this.parent[p] = root
      p = newp
    }
    return root
  }

  public connected(p: number, q: number): boolean {
    return this.find(p) === this.find(q)
  }

  public union(p: number, q: number): void {
    const rootP: number = this.find(p)
    const rootQ: number = this.find(q)
    if (rootP === rootQ) return

    // make smaller root point to larger one
    if (this.size[rootP] < this.size[rootQ]) {
      this.parent[rootP] = rootQ
      this.size[rootQ] += this.size[rootP]
    }
    else {
      this.parent[rootQ] = rootP
      this.size[rootP] += this.size[rootQ]
    }
    this.count--
  }

  private validate(p: number) {
    if (p < 0 || p >= this.N) {
      throw Error(`Index ${p} is not between 0 and ${this.N - 1}`)
    }
  }
}