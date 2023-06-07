import { assertEquals } from "https://deno.land/std@0.190.0/testing/asserts.ts"
import AVLTree from "../src/AVLTree.ts"

Deno.test("AVLTree - should insert nodes correctly", () => {
  const tree = new AVLTree()

  tree.insert(5)
  tree.insert(10)
  tree.insert(15)
  tree.insert(20)

  assertEquals(tree.search(tree.root, 5)?.value, 5)
  assertEquals(tree.search(tree.root, 10)?.value, 10)
  assertEquals(tree.search(tree.root, 15)?.value, 15)
  assertEquals(tree.search(tree.root, 20)?.value, 20)
})

Deno.test("AVLTree - should remove nodes correctly", () => {
  const tree = new AVLTree()

  tree.insert(5)
  tree.insert(10)
  tree.insert(15)
  tree.insert(20)

  tree.remove(10)
  tree.remove(15)

  assertEquals(tree.search(tree.root, 5)?.value, 5)
  assertEquals(tree.search(tree.root, 10), null)
  assertEquals(tree.search(tree.root, 15), null)
  assertEquals(tree.search(tree.root, 20)?.value, 20)
})

Deno.test("AVLTree - should balance the tree correctly", () => {
  const tree = new AVLTree()

  tree.insert(5)
  tree.insert(10)
  tree.insert(15)
  tree.insert(20)

  assertEquals(tree.root?.value, 10)
  assertEquals(tree.root?.left?.value, 5)
  assertEquals(tree.root?.right?.value, 15)

  tree.insert(25)

  assertEquals(tree.root?.value, 10)
  assertEquals(tree.root?.left?.value, 5)
  assertEquals(tree.root?.right?.value, 20)
  assertEquals(tree.root?.right?.left?.value, 15)
  assertEquals(tree.root?.right?.right?.value, 25)
})
