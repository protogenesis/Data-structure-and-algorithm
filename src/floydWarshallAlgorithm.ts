export type Graph = number[][]

export function floydWarshallAlgorithm(graph: Graph) {
  const n = graph.length
  const dist = [...graph]

  // reset two vertices is not connected, set their weight to infinity
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i !== j && dist[i][j] === 0) {
        dist[i][j] = Infinity
      }
    }
  }

  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (dist[i][k] + dist[k][j] < dist[i][j]) {
          dist[i][j] = dist[i][k] + dist[k][j]
        }
      }
    }
  }

  return dist
}

// const graph: Graph = [
//   [0, 8, -1, Infinity],
//   [Infinity, 0, Infinity, Infinity],
//   [Infinity, Infinity, 0, 3],
//   [Infinity, -3, Infinity, 0],
// ]

// const graph: Graph = [
//   [0, 8, -1, Infinity],
//   [Infinity, 0, Infinity, Infinity],
//   [Infinity, Infinity, 0, 3],
//   [Infinity, -3, Infinity, 0],
// ]
// const shortestDistances = floydWarshallAlgorithm(graph)
// console.log((shortestDistances))
// debugger
