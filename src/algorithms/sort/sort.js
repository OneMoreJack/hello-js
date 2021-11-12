const exch = (nums, i, j) => {
  let temp = nums[i]
  nums[i] = nums[j]
  nums[j] = temp
}

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
    let minIdx = i
    
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[j] < nums[minIdx]) minIdx = j
    }
    
    if (minIdx !== i) exch(nums, i, minIdx)
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
    let curr = nums[i],
        idx = i
    
    while (idx >= 1 && nums[idx - 1] > curr) {
      nums[idx] = nums[idx - 1]
      idx--
    }

    nums[idx] = curr
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

/**
 * 计数排序
 * @param {number[]}} nums 
 * @returns 
 */
export function countingSort(nums) {
  const maxValue = nums.reduce((acc, curr) => Math.max(acc, curr), 0)

  function sort(nums, maxValue) {
    const bucket = Array(maxValue + 1).fill(0)

    for (let i = 0; i < nums.length; i++) {
      bucket[nums[i]]++
    }

    for (let i = 0, j = 0; i < bucket.length; i++) {
      while (bucket[i] > 0) {
        nums[j++] = i
        bucket[i]--
      }
    }

    return nums
  }

  return sort(nums, maxValue)
}
