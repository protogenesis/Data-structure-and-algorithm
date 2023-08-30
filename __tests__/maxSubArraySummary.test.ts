import { assertEquals } from "https://deno.land/std@0.190.0/testing/asserts.ts"
import maxSubArraySummary from "../src/maxSubArraySummary.ts"

Deno.test(
  "The maxSubArraySummary function should return the correct summary",
  () => {
    const arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
    console.log(maxSubArraySummary(arr)) // 输出: 6，对应子数组 [4, -1, 2, 1]

    assertEquals(maxSubArraySummary(arr), 6)
  }
)
