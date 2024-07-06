class MinHeap {
  heap: { value: Vertex; priority: number }[]

  constructor() {
    this.heap = []
  }

  findParentIndex(index: number): number {
    return Math.floor((index - 1) / 2)
  }

  findLeftChildIndex(index: number): number {
    return index * 2 + 1
  }

  findRightChildIndex(index: number): number {
    return index * 2 + 2
  }

  swap(index1: number, index2: number): void {
    [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]]
  }

  insert(value: Vertex, priority: number): void {
    this.heap.push({ value, priority })
    this.bubbleUp(this.heap.length - 1)
  }

  bubbleUp(index: number): void {
    while (index > 0) {
      const parentIndex = this.findParentIndex(index)
      if (this.heap[parentIndex].priority > this.heap[index].priority) {
        this.swap(parentIndex, index)
      }
      index = parentIndex
    }
  }

  extractMin(): Vertex | null {
    if (this.heap.length === 0) {
      return null
    }
    const minVertex = this.heap[0]
    const lastVertex = this.heap.pop()!
    if (this.heap.length > 0) {
      this.heap[0] = lastVertex
      this.bubbleDown()
    }
    return minVertex.value
  }

  bubbleDown(): void {
    let index = 0
    while (true) {
      const leftChildIndex = this.findLeftChildIndex(index)
      const rightChildIndex = this.findRightChildIndex(index)
      let minIndex = index
      if (leftChildIndex < this.heap.length && this.heap[leftChildIndex].priority < this.heap[minIndex].priority) {
        minIndex = leftChildIndex
      }
      if (rightChildIndex < this.heap.length && this.heap[rightChildIndex].priority < this.heap[minIndex].priority) {
        minIndex = rightChildIndex
      }
      if (minIndex === index) {
        break
      }
      this.swap(minIndex, index)
      index = minIndex
    }
  }

  isEmpty(): boolean {
    return this.heap.length === 0
  }
}

class Edge {
  constructor(public from: number, public to: number, public weight: number) {}
}

class Vertex {
  constructor(
    public value: number,
    public children: Edge[] = [],
    public visited: boolean = false,
    public prev: Vertex | null = null
  ) {}
}

class Graph {
  vertices: Vertex[]
  distances: number[]
  constructor(public size: number) {
    this.vertices = Array.from({ length: size }, (_, k) => new Vertex(k))
    this.distances = Array.from({ length: size }, () => Infinity)
  }

  addEdge(from: number, to: number, weight: number) {
    const edge = new Edge(from, to, weight)
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

graph.distances[source] = 0

const priorityQueue = new MinHeap()
priorityQueue.insert(graph.vertices[source], graph.distances[source])

while (!priorityQueue.isEmpty()) {
  const currVertex = priorityQueue.extractMin()
  if (!currVertex || currVertex.value === destination) break

  for (let i = 0; i < currVertex.children.length; i++) {
    const edge = currVertex.children[i]
    const distance = graph.distances[edge.from] + edge.weight
    if (distance < graph.distances[edge.to]) {
      graph.distances[edge.to] = distance
      graph.vertices[edge.to].prev = graph.vertices[edge.from]
      if (!graph.vertices[edge.to].visited) {
        priorityQueue.insert(graph.vertices[edge.to], distance)
      }
    }
  }
  currVertex.visited = true
}

console.log(`The minimum weight is ${graph.distances[destination]}`)

const paths: number[] = []
let currVertex = graph.vertices[destination] as Vertex | null
while (currVertex) {
  paths.push(currVertex.value)
  currVertex = currVertex.prev
}
paths.reverse().forEach(e => console.log(e))
