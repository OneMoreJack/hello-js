/**
 * 冒泡排序
 * 时间复杂度 O(n^2)
 * 空间复杂度 O(1)
 * @param {Array} nums 
 * @returns {Array}
 */
function bubble(nums) {
  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = 1; j < nums.length - i; j++) {
      if (nums[j - 1] > nums[j]) {
        [ nums[j - 1], nums[j] ] = [ nums[j], nums[j - 1] ]
      } 
    }
  }
  return nums
}

module.exports = {
  bubble
}
