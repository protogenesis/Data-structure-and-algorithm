import { assertEquals } from "https://deno.land/std@0.190.0/testing/asserts.ts"
import { floydWarshallAlgorithm, Graph } from "../src/floydWarshallAlgorithm.ts"

Deno.test("Test floydWarshallAlgorithm with simple 3-node graph", () => {
  const graph: Graph = [
    [0, 1, 5],
    [Infinity, 0, 3],
    [Infinity, Infinity, 0],
  ]

  const result = floydWarshallAlgorithm(graph)

  const expected: Graph = [
    [0, 1, 4],
    [Infinity, 0, 3],
    [Infinity, Infinity, 0],
  ]

  assertEquals(result, expected)
})

Deno.test("Test floydWarshallAlgorithm with disconnected nodes", () => {
  const graph: Graph = [
    [0, Infinity, 5],
    [Infinity, 0, 3],
    [Infinity, Infinity, 0],
  ]

  const result = floydWarshallAlgorithm(graph)

  const expected: Graph = [
    [0, Infinity, 5],
    [Infinity, 0, 3],
    [Infinity, Infinity, 0],
  ]

  assertEquals(result, expected)
})

Deno.test("Test floydWarshallAlgorithm with negative edge weights", () => {
  const graph: Graph = [
    [0, -1, 5],
    [Infinity, 0, 3],
    [Infinity, Infinity, 0],
  ]

  const result = floydWarshallAlgorithm(graph)

  const expected: Graph = [
    [0, -1, 2],
    [Infinity, 0, 3],
    [Infinity, Infinity, 0],
  ]

  assertEquals(result, expected)
})

Deno.test("Test floydWarshallAlgorithm with disconnected graph", () => {
  const graph: Graph = [
    [0, 1, Infinity, Infinity],
    [1, 0, Infinity, Infinity],
    [Infinity, Infinity, 0, 1],
    [Infinity, Infinity, 1, 0],
  ]

  const result = floydWarshallAlgorithm(graph)

  const expected: Graph = [
    [0, 1, Infinity, Infinity],
    [1, 0, Infinity, Infinity],
    [Infinity, Infinity, 0, 1],
    [Infinity, Infinity, 1, 0],
  ]

  assertEquals(result, expected)
})

Deno.test("Test floydWarshallAlgorithm with large graph", () => {
  const graph: Graph = [
    [0, 1, 5, 3, 1],
    [1, 0, 2, 2, 1],
    [5, 2, 0, 2, 3],
    [3, 2, 2, 0, 1],
    [1, 1, 3, 1, 0],
  ]

  const result = floydWarshallAlgorithm(graph)

  const expected: Graph = [
    [0, 1, 3, 2, 1],
    [1, 0, 2, 2, 1],
    [3, 2, 0, 2, 3],
    [2, 2, 2, 0, 1],
    [1, 1, 3, 1, 0],
  ]

  assertEquals(result, expected)
})
