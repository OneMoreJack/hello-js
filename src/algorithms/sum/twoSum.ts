
/**
 * 《算法4》 Page-119   
 * 找出一个数组中所有和为 target 的整数对的数量。***假设所有整数均各不相同***
 * 
 * 时间复杂度O(NlogN)
 * 
 * *此方法只适用于数组元素不同的情况*
 */
export function twoSum(nums: number[], target: number): number {
  nums.sort((a, b) => a - b)

  let cns = 0
  for (let i = 0; i < nums.length; i++)
    if (binarySearch(nums, target - nums[i]) > i)
      cns++
  
  return cns
}

function binarySearch(nums: number[], target: number): number {
  let low = 0,
      high = nums.length - 1,
      mid: number
  
  while (low <= high) {
    mid = Math.floor((high + low) / 2)
    if (target === nums[mid]) return mid
    else if (target > nums[mid]) low = mid + 1
    else high = mid - 1
  }
  return -1
}
