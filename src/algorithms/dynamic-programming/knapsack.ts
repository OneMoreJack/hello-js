
export function knapsack(weights: number[], values: number[], W: number): number {
  const N: number = weights.length
  const dp: number[][] = Array(N + 1).fill(0).map(() => Array(W + 1).fill(0))

  for (let i = 1; i <= N; i++) {
    for (let j = 1; j <= W; j++) {
      if (j - weights[i - 1] < 0) {
        dp[i][j] = dp[i - 1][j]
      } else {
        dp[i][j] = Math.max(
          dp[i - 1][j],
          dp[i - 1][j - weights[i - 1]] + values[i - 1]
        )
      }
    }
  }

  return dp[N][W]
}

/**
 * 空间优化版本
 * @param weights 
 * @param values 
 * @param W 
 * @returns 
 */
export function knapsack1(weights: number[], values: number[], W: number): number {
  const N: number = weights.length
  const dp: number[] = Array(W + 1).fill(0)

  for (let i = 0; i < N; i++) {
    for (let j = W; j >= weights[i]; j--) {
      dp[j] = Math.max(
        dp[j],
        dp[j - weights[i]] + values[i]
      )
    }
  }

  return dp[W]
}

