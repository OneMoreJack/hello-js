
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
      while (v < nums[--j]) if (j === lo) break;
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
