import { assertEquals } from "https://deno.land/std@0.190.0/testing/asserts.ts"
import MinStack from "../src/minStack.ts"

const minStack = new MinStack()

Deno.test('The min stack should operate properly', () => {
  minStack.push(-2)
  minStack.push(0)
  minStack.push(-3)

  assertEquals(minStack.getMin(), -3)
  
  minStack.pop()

  assertEquals(minStack.top(), 0)
  assertEquals(minStack.getMin(), -2)
})
