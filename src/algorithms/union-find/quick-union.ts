import { UF } from './base-uf'

export class QuickUnion extends UF {
  public find(p: number) {
    while (p !== this.id[p]) p = this.id[p]
    return p
  }

  public union(p: number, q: number) {
    const pRoot = this.find(p),
          qRoot = this.find(q)
    
    if (pRoot === qRoot) return
    this.id[pRoot] = qRoot
    this.count--
  }
}
