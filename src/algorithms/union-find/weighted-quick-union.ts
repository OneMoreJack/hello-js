import { UF } from './base-uf'

/**
 * 算法《4》 Page145
 * 加权 quick-union 算法
 */
export class WeightedQuickUnion extends UF {
  //（由触点索引的）各个根节点所对应的分量的大小
  sz: number[] 

  constructor(n: number) {
    super(n)
    this.sz = Array(n).fill(1)
  }

  public find(p: number) {
    while (p !== this.id[p]) p = this.id[p]
    return p
  }

  public union(p: number, q: number) {
    let i: number = this.find(p),
        j: number = this.find(q)

    if (i === j) return

    // 将小树的根节点连接到大树的根节点
    if (this.sz[i] < this.sz[j]) {
      this.id[i] = j
      this.sz[j] += this.sz[i]
    }
    else {
      this.id[j] = i
      this.sz[i] += this.sz[j]
    }
    this.count--
  }
}
