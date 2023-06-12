import { assert } from "https://deno.land/std@0.190.0/testing/asserts.ts"
import Graph from "../src/prim'sAlgorithm.ts";

Deno.test("Graph - Prim's MST", () => {
  const graph = new Graph(5)

  // Add edges
  graph.addEdge(0, 1, 2)
  graph.addEdge(0, 2, 3)
  graph.addEdge(1, 2, 1)
  graph.addEdge(1, 3, 4)
  graph.addEdge(2, 4, 5)
  graph.addEdge(3, 4, 6)

  const mst = graph.primMST()

  // Assert the minimum spanning tree contains the correct edges
  assert(mst.length === 4)
  assert(mst[0][0] === 0 && mst[0][1] === 1 && mst[0][2] === 2)
  assert(mst[1][0] === 1 && mst[1][1] === 2 && mst[1][2] === 1)
  assert(mst[2][0] === 1 && mst[2][1] === 3 && mst[2][2] === 4)
  assert(mst[3][0] === 2 && mst[3][1] === 4 && mst[3][2] === 5)
})
