class Edge {
  constructor(public from: number, public to: number, public weight: number) { }
}

class Vertex {
  constructor(public value: number, public children: Edge[] = [], public visited: boolean = false, public prev: Vertex | null = null) { }
}

class Graph {
  vertices: Vertex[]
  distances: number[]
  constructor(public size: number) {
    this.vertices = Array.from({ length: size }, (_, k) => new Vertex(k))
    this.distances = Array.from({ length: size }, (_, k) => Infinity)
  }

  addEdge(from: number, to: number, weight: number) {
    const edge = new Edge(
      from,
      to,
      weight
    )

    this.vertices[from].children.push(edge)
  }
}

const graph = new Graph(7)

graph.addEdge(0, 2, 3)
graph.addEdge(0, 5, 2)
graph.addEdge(5, 2, 2)
graph.addEdge(5, 4, 3)
graph.addEdge(5, 1, 6)
graph.addEdge(5, 6, 5)
graph.addEdge(2, 4, 1)
graph.addEdge(2, 3, 4)
graph.addEdge(4, 1, 2)
graph.addEdge(3, 1, 1)
graph.addEdge(6, 1, 2)


const source = 0
const destination = 1

graph.distances[0] = 0


const priorityQueue = [graph.vertices[source]]
let currVertex = graph.vertices[source]

while (true) {
  currVertex = priorityQueue.reduce((a, b) => graph.distances[a.value] < graph.distances[b.value] ? a : b)
  // console.log(priorityQueue.map((e) => e.value))
  priorityQueue.splice(priorityQueue.findIndex((v) => v === currVertex), 1)

  if (currVertex.value === destination) {
    break
  }

  for (let i = 0; i < currVertex.children.length; i++) {
    const edge = currVertex.children[i]
    const distance = graph.distances[edge.from] + edge.weight

    if (distance < graph.distances[edge.to]) {
      graph.distances[edge.to] = distance
      graph.vertices[edge.to].prev = graph.vertices[edge.from]
      if (!graph.vertices[edge.to].visited) {
        priorityQueue.push(graph.vertices[edge.to])
      }
    }
  }
  currVertex.visited = true
}

console.log(`The minimum weight is ${graph.distances[destination]}`)

const paths: number[] = []
if (currVertex) {
  paths.push(currVertex.value)

  let prev = currVertex.prev
  while (prev) {
    paths.push(prev.value)
    prev = prev.prev
  }
}

paths.reverse().forEach((e) => console.log(e))