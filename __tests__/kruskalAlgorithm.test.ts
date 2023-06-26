import {
  assertEquals,
  assertNotEquals,
} from "https://deno.land/std@0.190.0/testing/asserts.ts"
import { UnionFind, Edge, KurskalAlgorithm } from "../src/kruskalAlgorithm.ts"

Deno.test("UnionFind works correctly", () => {
  const uf = new UnionFind(5)

  uf.union(0, 1)
  uf.union(2, 3)
  uf.union(3, 4)

  assertEquals(uf.find(0), uf.find(1))
  assertEquals(uf.find(2), uf.find(3))
  assertEquals(uf.find(3), uf.find(4))
  assertEquals(uf.find(2), uf.find(4))
  assertNotEquals(uf.find(0), uf.find(2))
})

Deno.test("KruskalAlgorithm works correctly", () => {
  const edges = [
    new Edge(0, 1, 10),
    new Edge(0, 2, 6),
    new Edge(0, 3, 5),
    new Edge(1, 3, 15),
    new Edge(2, 3, 4),
  ]

  const graph = new KurskalAlgorithm(edges, 4)
  const mst = graph.getMST()

  assertEquals(mst.length, 3)

  // Edge 2 -> 3
  assertEquals(mst[0].source, 2)
  assertEquals(mst[0].destination, 3)
  assertEquals(mst[0].weight, 4)

  // Edge 0 -> 3
  assertEquals(mst[1].source, 0)
  assertEquals(mst[1].destination, 3)
  assertEquals(mst[1].weight, 5)

  // Edge 0 -> 1
  assertEquals(mst[2].source, 0)
  assertEquals(mst[2].destination, 1)
  assertEquals(mst[2].weight, 10)
})
