import { UF } from './base-uf'

export class QuickFind extends UF {
  public find(p: number): number {
    return this.id[p]
  }

  // 将 p 和 q 合并到同一分量中
  public union(p: number, q: number) {
    const pId: number = this.find(p)
    const qId: number = this.find(q)

    if (pId === qId) return

    // 将p的分量重命名为q的名称
    for (let i = 0; i < this.id.length; i++) {
      if (this.id[i] === pId) this.id[i] = qId
    }
    this.count--
  }
}
