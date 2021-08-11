/**
 * 冒泡排序
 * 时间复杂度 O(n^2)
 * 空间复杂度 O(1)
 * @param {Array} nums 
 * @returns {Array}
 */
export function bubble(nums) {
  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = 1; j < nums.length - i; j++) {
      if (nums[j - 1] > nums[j]) {
        [ nums[j - 1], nums[j] ] = [ nums[j], nums[j - 1] ]
      } 
    }
  }
  return nums
}

/**
 * 选择排序
 * 时间复杂度 O(n^2)
 * 空间复杂度 O(1)
 * @param {Array} nums 
 * @returns {Array}
 */
export function select(nums) {
  for (let i = 0; i < nums.length - 1; i++) {
    let curr = nums[i],
        minIdx = i
    
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[j] < nums[minIdx]) {
        minIdx = j
      }
    }
    
    nums[i] = nums[minIdx]
    nums[minIdx] = curr
  }
  return nums
}

/**
 * 插入排序
 */
export function insert(nums) {
  for (let i = 1; i < nums.length; i++) {
    let prevIdx = i - 1,
        temp = nums[i]

    while (prevIdx >= 0 && nums[prevIdx] > temp) {
      nums[prevIdx + 1] = nums[prevIdx]
      prevIdx--
    }
    nums[prevIdx + 1] = temp
  }
  return nums
}
