/**《算法4》 Page-139
 * 算法 1.5 union-find 的实现
 */
export abstract class UF {
  protected id: number[]
  protected count: number

  constructor(n: number) {
    this.count = n
    this.id = Array(n).fill(0).map((_, index) => index)
  }

  public getCount(): number {
    return this.count
  }

  public connected(p: number, q: number): boolean {
    return this.find(p) === this.find(q)
  }

  abstract find(p: number): number

  abstract union(p: number, q: number): void
}