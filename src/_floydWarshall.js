function floydWarshall(graph) {
  const n = graph.length
  const dist = [...graph]

  // Initialize distance matrix with initial weights
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i !== j && dist[i][j] === 0) {
        dist[i][j] = Infinity // No direct edge, set distance to infinity
      }
    }
  }
  // Calculate shortest distances
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

// Example usage:
const graph = [
  [0, 1, 5, 3, 1],
  [1, 0, 2, 2, 1],
  [5, 2, 0, 2, 3],
  [3, 2, 2, 0, 1],
  [1, 1, 3, 1, 0],
]

// const graph = [
//   [0, 8, -1, Infinity],
//   [Infinity, 0, Infinity, Infinity],
//   [Infinity, Infinity, 0, 3],
//   [Infinity, -3, Infinity, 0],
// ]
const shortestDistances = floydWarshall(graph)
console.log(shortestDistances)
debugger
