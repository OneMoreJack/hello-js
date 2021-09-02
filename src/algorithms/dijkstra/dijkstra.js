// 迪克斯特拉算法

function findLowestCostNode(costs, processed) {
  let lowestCost = Infinity,
      lowestCostNode = null

  for (let node of Object.keys(costs)) {
    const cost = costs[node]
    if (lowestCost > cost && !processed.includes(node)) {
      lowestCost = cost
      lowestCostNode = node
    }
  }
  return lowestCostNode
}

export function minDistance(graph) {
  let costs = {}, parent = {}, processed = []
  for (let key of Object.keys(graph)) {
    costs[key] = key === 'start' ? 0 : Infinity
  }
  let node = findLowestCostNode(costs, processed)

  let cost, neighbors, newCost
  while (node) {
    cost = costs[node]
    neighbors = graph[node]
    for (let [n, edge] of Object.entries(neighbors)) {
      newCost = cost + edge
      if (newCost < costs[n]) {
        costs[n] = newCost
        parent[n] = node
      }
    }
    processed.push(node)
    node = findLowestCostNode(costs, processed)
  }

  return costs.end
}
