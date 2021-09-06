// 背包问题

// 《算法图解》练习9.2
const staff = {
  'water': { weight: 3, value: 10 },
  'books': { weight: 1, value: 3 },
  'food': { weight: 2, value: 9 },
  'jack': { weight: 2, value: 5 },
  'camera': { weight: 1, value: 6 },
}

function whatToPack(options, capacity) {
  let values = {}, weights = {}, names = {}, m = Object.keys(options).length

  Object.entries(options).forEach(([name, info], index) => {
    const { weight, value } = info
    names[index] = name
    values[index] = value
    weights[index] = weight
  })

  const dp = Array(capacity + 1).fill(0)
  for (let i = 0; i <= m; i++) {
    for (let j = capacity; j >= weights[i]; j--) {
      dp[j] = Math.max(dp[j], dp[j-weights[i]] + values[i])
    }
  }
  return dp[capacity]
}

console.log(whatToPack(staff, 6))


/**
 * 01背包问题
 * @param {Array} weights - 物品重量
 * @param {Array} values - 物品价值
 * @param {Number} W - 背包容量
 */
function knapsack01(weights, values, W) {
  const n = weights.length

  const arr = Array(W + 1).fill(0)
  for (let i = 0; i < n; i++) {
    for (let j = W; j >= weights[i]; j--) {
      arr[j] = Math.max(arr[j], values[i] + arr[j - weights[i]])
    }
  }

  return arr[W]
}

console.log(knapsack01([3, 1, 2, 2, 1], [10, 3, 9, 5, 6], 6))
