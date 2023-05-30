const WeightedGraph = require("../src/weightedGraph")

describe("WeightedGraph", () => {
  test("Graph should be empty initially", () => {
    const graph = new WeightedGraph()
    expect(graph.vertices.size).toBe(0)
  })

  test("addVertex should add a single vertex", () => {
    const graph = new WeightedGraph()
    graph.addVertex("A")
    expect(graph.vertices.size).toBe(1)
  })

  test("addVertex should not add duplicate vertices", () => {
    const graph = new WeightedGraph()
    graph.addVertex("A")
    graph.addVertex("A")
    expect(graph.vertices.size).toBe(1)
  })

  test("addEdge should add edge correctly", () => {
    const graph = new WeightedGraph()
    const vertexA = graph.addVertex("A")
    const vertexB = graph.addVertex("B")
    graph.addEdge(vertexA, vertexB, 1)
    expect(vertexA.children.has(vertexB)).toBe(true)
    expect(vertexA.children.get(vertexB)).toBe(1)
  })

  test("addEdge should add vertices automatically if not present", () => {
    const graph = new WeightedGraph()
    const vertexA = graph.addVertex("A")
    const vertexB = graph.addVertex("B")
    graph.addEdge(vertexA, vertexB, 1)
    expect(graph.vertices.has(vertexA)).toBe(true)
    expect(graph.vertices.has(vertexB)).toBe(true)
  })

  test("Complex Graph with Multiple Edges and Vertices", () => {
    const graph = new WeightedGraph()
    const vertexA = graph.addVertex("A")
    const vertexB = graph.addVertex("B")
    const vertexC = graph.addVertex("C")
    const vertexD = graph.addVertex("D")
    const vertexE = graph.addVertex("E")
    const vertexF = graph.addVertex("F")

    graph.addEdge(vertexA, vertexB, 1)
    graph.addEdge(vertexA, vertexC, 3)
    graph.addEdge(vertexB, vertexD, 4)
    graph.addEdge(vertexC, vertexD, 6)
    graph.addEdge(vertexD, vertexE, 50)
    graph.addEdge(vertexE, vertexF, 54)

    expect(graph.vertices.size).toBe(6)
    expect(vertexA.children.size).toBe(2)
    expect(vertexB.children.size).toBe(1)
    expect(vertexC.children.size).toBe(1)
    expect(vertexD.children.size).toBe(1)
    expect(vertexE.children.size).toBe(1)
    expect(vertexF.children.size).toBe(0)
  })
})
