class Graph {
  public graph: number[][]
  constructor(public size: number) {
    this.size = size
    this.graph = new Array(size)
      .fill(null)
      .map(() => new Array<number>(size).fill(0))
  }

  addEdge(source: number, destination: number, weight: number) {
    this.graph[source][destination] = weight
    this.graph[destination][source] = weight
  }

  primMST() {
    const parent = new Array(this.size).fill(-1)

    const weights = new Array(this.size).fill(Number.MAX_SAFE_INTEGER)

    const visited = new Array(this.size).fill(false)

    parent[0] = -1
    weights[0] = 0

    for (let index = 0; index < this.size - 1; index++) {
      const u = this.findMinWeight(weights, visited)

      visited[u] = true

      for (let v = 0; v < this.size; v++) {
        if (this.graph[u][v] && !visited[v] && this.graph[u][v] < weights[v]) {
          parent[v] = u
          weights[v] = this.graph[u][v]
        }
      }
    }

    const mst: number[][] = []
    for (let i = 1; i < parent.length; i++) {
      mst.push([parent[i], i, this.graph[parent[i]][i]])
    }

    return mst
  }

  findMinWeight(weights: number[], visited: number[]) {
    let min = Number.MAX_SAFE_INTEGER
    let minIndex = -1

    for (let i = 0; i < this.size; i++) {
      if (!visited[i] && weights[i] < min) {
        min = weights[i]
        minIndex = i
      }
    }

    return minIndex
  }
}

export default Graph
// Example usage:
// const graph = new Graph(5)
// graph.addEdge(0, 1, 2)
// graph.addEdge(0, 3, 6)
// graph.addEdge(1, 2, 3)
// graph.addEdge(1, 3, 8)
// graph.addEdge(1, 4, 5)
// graph.addEdge(2, 4, 7)
// graph.addEdge(3, 4, 9)
// const minimumSpanningTree = graph.primMST()
// console.log("Edges in the minimum spanning tree:")
// minimumSpanningTree.forEach(([source, destination, weight]) => {
//   console.log(`${source} -- ${destination} \tWeight: ${weight}`)
// })
