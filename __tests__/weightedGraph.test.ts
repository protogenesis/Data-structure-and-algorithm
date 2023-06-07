import { assertEquals } from "https://deno.land/std@0.190.0/testing/asserts.ts"
import WeightedGraph from "../src/weightedGraph.ts"

Deno.test("WeightedGraph - Graph should be empty initially", () => {
  const graph = new WeightedGraph()
  assertEquals(graph.vertices.size, 0)
})

Deno.test("WeightedGraph - addVertex should add a single vertex", () => {
  const graph = new WeightedGraph()
  graph.addVertex("A")
  assertEquals(graph.vertices.size, 1)
})

Deno.test("WeightedGraph - addVertex should not add duplicate vertices", () => {
  const graph = new WeightedGraph()
  graph.addVertex("A")
  graph.addVertex("A")
  assertEquals(graph.vertices.size, 1)
})

Deno.test("WeightedGraph - addEdge should add edge correctly", () => {
  const graph = new WeightedGraph()
  const vertexA = graph.addVertex("A")
  const vertexB = graph.addVertex("B")
  graph.addEdge(vertexA, vertexB, 1)
  assertEquals(vertexA.children.has(vertexB), true)
  assertEquals(vertexA.children.get(vertexB), 1)
})

Deno.test(
  "WeightedGraph - addEdge should add vertices automatically if not present",
  () => {
    const graph = new WeightedGraph()
    const vertexA = graph.addVertex("A")
    const vertexB = graph.addVertex("B")
    graph.addEdge(vertexA, vertexB, 1)
    assertEquals(graph.vertices.has(vertexA), true)
    assertEquals(graph.vertices.has(vertexB), true)
  }
)

Deno.test(
  "WeightedGraph - Complex Graph with Multiple Edges and Vertices",
  () => {
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

    assertEquals(graph.vertices.size, 6)
    assertEquals(vertexA.children.size, 2)
    assertEquals(vertexB.children.size, 1)
    assertEquals(vertexC.children.size, 1)
    assertEquals(vertexD.children.size, 1)
    assertEquals(vertexE.children.size, 1)
    assertEquals(vertexF.children.size, 0)
  }
)
