/**
 * UnionFind data structure implementation.
 */
export class UnionFind {
  public parent: number[]
  public rank: number[]

  /**
   * Initialize UnionFind data structure.
   * @param size - Number of nodes in the graph
   */
  constructor(size: number) {
    this.parent = Array.from({ length: size }, (_, i) => i)
    this.rank = Array(size).fill(1)
  }

  /**
   * Find the root of a node.
   * @param x - Node to find the root of
   * @returns Root of the node
   */
  find(x: number): number {
    if (x !== this.parent[x]) {
      this.parent[x] = this.find(this.parent[x])
    }

    return this.parent[x]
  }

  /**
   * Union of two nodes.
   * @param x - First node
   * @param y - Second node
   */
  union(x: number, y: number): void {
    const rootX = this.find(x)
    const rootY = this.find(y)

    if (rootX !== rootY) {
      if (this.rank[rootX] < this.rank[rootY]) {
        this.parent[rootX] = rootY
      } else {
        this.parent[rootY] = rootX
        if (this.rank[rootX] === this.rank[rootY]) {
          this.rank[rootX]++
        }
      }
    }
  }
}

/**
 * An edge of a graph.
 */
export class Edge {
  constructor(
    public source: number,
    public destination: number,
    public weight: number
  ) {}
}

/**
 * Kruskal's algorithm implementation.
 */
export class KurskalAlgorithm {
  constructor(public edges: Edge[], public size: number) {
    this.edges.sort((a, b) => a.weight - b.weight)
  }

  /**
   * Get the minimum spanning tree (MST) of a graph.
   * @returns Array of edges forming the MST
   */
  getMST(): Edge[] {
    const mst: Edge[] = []
    const unionFind = new UnionFind(this.size)

    for (const edge of this.edges) {
      const { source, destination } = edge
      const rootX = unionFind.find(source)
      const rootY = unionFind.find(destination)

      if (rootX !== rootY) {
        mst.push(edge)
        unionFind.union(rootX, rootY)
      }
    }

    return mst
  }
}

// const edges = [
//   new Edge(0, 1, 4),
//   new Edge(0, 7, 8),
//   new Edge(1, 2, 8),
//   new Edge(1, 7, 11),
//   new Edge(2, 3, 7),
//   new Edge(2, 8, 2),
//   new Edge(2, 5, 4),
//   new Edge(3, 4, 9),
//   new Edge(3, 5, 14),
//   new Edge(4, 5, 10),
//   new Edge(5, 6, 2),
//   new Edge(6, 7, 1),
//   new Edge(6, 8, 6),
//   new Edge(7, 8, 7),
// ]

// const mst = new KurskalAlgorithm(edges, 9).getMST()

// console.log(mst)
