
function exch(nums: number[], i: number, j: number): void {
  const temp = nums[i]
  nums[i] = nums[j]
  nums[j] = temp
}

export function quickSort(nums: number[]): number[] {
  function partition(nums: number[], lo: number, hi: number): number {
    let i = lo, j = hi + 1
    const v = nums[lo]
    while (true) {
      while (nums[++i] < v) if (i === hi) break;
      while (v < nums[--j]) if (j === lo) break; // j === lo 冗余，因为 v 就是 a[lo], 它不可能比自己小
      if (i >= j) break
      exch(nums, i, j)
    }
    exch(nums, lo, j)
    return j
  }
  
  function _sort(nums: number[], lo: number, hi: number) {
    if (hi <= lo) return
    const j = partition(nums, lo, hi)
    _sort(nums, lo, j - 1)
    _sort(nums, j + 1, hi)
  }

  _sort(nums, 0, nums.length - 1)
  return nums
}

/**
 * 三切分快速排序，适合有大量重复元素的排序
 * @param nums 
 * @returns 
 */
export function quick3Way(nums: number[]): number[] {
  const compareTo = (m: number, n: number) => m - n
  function sort(nums: number[], lo: number, hi: number) {
    if (hi <= lo) return
    let lt: number = lo,
        gt: number = hi,
        i: number = lo + 1

    const v = nums[lo]
    while (i <= gt) {
      const cmp = compareTo(nums[i], v)
      if (cmp < 0) exch(nums, lt++, i++)
      else if (cmp > 0) exch(nums, gt--, i)
      else i++
    }

    sort(nums, lo, lt - 1)
    sort(nums, gt + 1, hi)
  }

  sort(nums, 0, nums.length - 1)
  return nums
}
