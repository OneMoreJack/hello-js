const { minDistance } = require('../dijkstra')

// 《图解算法》练习7.1
const graph1 = {
  start: {
    B: 5,
    C: 2,
  },
  B: {
    D: 4,
    E: 2,
  },
  C: {
    B: 8,
    E: 7
  },
  D: {
    E: 6,
    end: 3
  },
  E: {
    end: 1
  },
  end: {}
}

const graph2 = {
  start: {
    B: 10,
  },
  B: {
    D: 20,
  },
  C: {
    B: 1
  },
  D: {
    C: 1,
    end: 30,
  },
  end: {}
}

describe('迪克斯特拉--最短路径', () => {
  
  it('图1', () => {
    expect(minDistance(graph1)).toBe(8)
  })

  it('图2', () => {
    expect(minDistance(graph2)).toBe(60)
  })
})

