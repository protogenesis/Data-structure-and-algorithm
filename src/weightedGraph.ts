class Vertex {
  public children: Map<Vertex, number>
  constructor(public value: string) {
    this.value = value
    this.children = new Map()
  }
}

class WeightedGraph {
  public vertices: Set<Vertex>
  constructor() {
    this.vertices = new Set()
  }

  addVertex(value: string) {
    for (const vertex of this.vertices) {
      if (vertex.value === value) {
        return vertex
      }
    }

    const vertex = new Vertex(value)
    this.vertices.add(vertex)
    return vertex
  }

  addEdge(from: Vertex, to: Vertex, weight: number) {
    if (!this.vertices.has(from)) {
      this.vertices.add(from)
    }

    if (!this.vertices.has(to)) {
      this.vertices.add(to)
    }

    from.children.set(to, weight)
  }

  print() {
    for (const v of this.vertices) {
      console.log(v)
      if (v.children) {
        this.printChildren(v.children)
      }
    }
  }

  printChildren(vertices: Vertex['children']) {
    vertices.forEach((weight, vertex) => {
      console.log("---", vertex.value, weight)
    })
  }
}

export default WeightedGraph

// const graph = new WeightedGraph()
// const vertexA = graph.addVertex("A")
// const vertexB = graph.addVertex("B")
// const vertexC = graph.addVertex("C")
// const vertexD = graph.addVertex("D")
// const vertexE = graph.addVertex("E")
// const vertexF = graph.addVertex("F")

// graph.addEdge(vertexA, vertexB, 1)
// graph.addEdge(vertexA, vertexC, 3)
// graph.addEdge(vertexB, vertexD, 4)
// graph.addEdge(vertexC, vertexD, 6)
// graph.addEdge(vertexD, vertexE, 50)
// graph.addEdge(vertexE, vertexF, 54)

// console.log(graph.print(graph.vertices))
