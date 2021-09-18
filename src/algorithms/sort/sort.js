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
 * 时间复杂度 O(n^2)
 * 空间复杂度 O(1)
 * @param {Array} nums 
 * @returns {Array}
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

/* ------------------------- 堆排序 ------------------------ */
let len = 0

export function heapSort(nums) {
  buildMaxHeap(nums)
  for (let i = len - 1; i > 0; i--) {
    swap(nums, 0, i)
    len--
    heapify(nums, 0)
  }
  return nums
}

function buildMaxHeap(nums) {
  len = nums.length
  for (let i = Math.floor(len / 2); i >= 0; i--) {
    heapify(nums, i)
  }
}

function heapify(nums, i) {
  let left = i * 2 + 1,
      right = i * 2 + 2,
      largest = i
  
  if (left < len && nums[left] > nums[largest]) {
    largest = left
  }

  if (right < len && nums[right] > nums[largest]) {
    largest = right
  }

  if (largest !== i) {
    swap(nums, i, largest)
    heapify(nums, largest)
  }
}

function swap(nums, i, j) {
  let temp = nums[i]
  nums[i] = nums[j]
  nums[j] = temp
}


/* ------------------------ 归并排序 ------------------------ */
export function mergeSort(nums) {
  if (nums.length < 2) {
    return nums
  }

  let middle = Math.floor(nums.length / 2),
      left = nums.slice(0, middle),
      right = nums.slice(middle)
  
  return merge(mergeSort(left), mergeSort(right))
}

function merge(arr1, arr2) {
  let result = []

  while(arr1.length && arr2.length) {
    if (arr1[0] <= arr2[0])
      result.push(arr1.shift())
    else
      result.push(arr2.shift())
  }

  if (arr1.length) result = [...result, ...arr1]
  if (arr2.length) result = [...result, ...arr2]

  return result
}

/* ------------------------ 希尔排序 ------------------------ */
export function hellSort(nums) {
  let interval = 1
  while (interval < nums.length / 3) {
    interval = interval * 3 + 1
  }

  while (interval > 0) {
    for (let i = interval; i < nums.length; i++) {
      let temp = i, curr = nums[temp]
      while (temp - interval > -1 && nums[temp - interval] > curr) {
        nums[temp] = nums[temp - interval]
        temp -= interval
      }
      nums[temp] = curr
    }
    interval = Math.floor(interval / 3)
  }
  return nums
}
