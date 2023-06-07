import { assertEquals } from "https://deno.land/std@0.190.0/testing/asserts.ts"
import quickSort from "../src/quickSort.ts"

Deno.test("quickSort - Sorts an array of positive numbers", () => {
  const input = [2, 6, 1, 0, 4, 99, 24, 444, 1, 99, 23, 5]
  const expected = [0, 1, 1, 2, 4, 5, 6, 23, 24, 99, 99, 444]
  const result = quickSort(input)
  assertEquals(result, expected)
})

Deno.test("quickSort - Sorts an array of negative numbers", () => {
  const input = [-6, -20, -2, -8]
  const expected = [-20, -8, -6, -2]
  const result = quickSort(input)
  assertEquals(result, expected)
})

Deno.test(
  "quickSort - Sorts an array with positive and negative numbers",
  () => {
    const input = [-10, 5, 0, -3, 8, -2]
    const expected = [-10, -3, -2, 0, 5, 8]
    const result = quickSort(input)
    assertEquals(result, expected)
  }
)

Deno.test("quickSort - Sorts an empty array", () => {
  const input: number[] = []
  const expected: number[] = []
  const result = quickSort(input)
  assertEquals(result, expected)
})

Deno.test("quickSort - Sorts an array with a single element", () => {
  const input = [42]
  const expected = [42]
  const result = quickSort(input)
  assertEquals(result, expected)
})
