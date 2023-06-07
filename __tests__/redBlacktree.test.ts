import { assertEquals } from "https://deno.land/std@0.190.0/testing/asserts.ts"
import RedBlackTree from "../src/redBlackTree.ts"

Deno.test("RedBlackTree - insert should insert a node into the tree", () => {
  const tree = new RedBlackTree()

  // Insert a node.
  tree.insert(1)

  // Check that the node is in the tree.
  assertEquals(tree.contains(1), true)
})

Deno.test(
  "RedBlackTree - insert should insert multiple nodes into the tree",
  () => {
    const tree = new RedBlackTree()

    // Insert two nodes.
    tree.insert(1)
    tree.insert(2)

    // Check that both nodes are in the tree.
    assertEquals(tree.contains(1), true)
    assertEquals(tree.contains(2), true)
  }
)

Deno.test("RedBlackTree - Deletion - Deleting a leaf node", () => {
  const tree = new RedBlackTree()

  tree.insert(10)
  tree.insert(5)
  tree.insert(15)
  tree.insert(3)
  tree.insert(7)

  tree.delete(3)

  assertEquals(tree.contains(3), false)
  assertEquals(tree.root?.left?.left, null)
})

Deno.test("RedBlackTree - Deletion - Deleting a node with one child", () => {
  const tree = new RedBlackTree()

  tree.insert(10)
  tree.insert(5)
  tree.insert(15)
  tree.insert(3)
  tree.insert(7)

  tree.delete(15)

  assertEquals(tree.contains(15), false)
  assertEquals(tree.root?.right?.value, 10)
})

Deno.test("RedBlackTree - Deletion - Deleting a node with two children", () => {
  const tree = new RedBlackTree()

  tree.insert(10)
  tree.insert(5)
  tree.insert(15)
  tree.insert(3)
  tree.insert(7)
  tree.insert(13)
  tree.insert(17)

  tree.delete(15)

  assertEquals(tree.contains(15), false)
  assertEquals(tree.root?.right?.value, 17)
  assertEquals(tree.root?.right?.left?.value, 13)
})

Deno.test(
  "RedBlackTree - Deletion - Deleting the root node with two children",
  () => {
    const tree = new RedBlackTree()

    tree.insert(10)
    tree.insert(5)
    tree.insert(15)
    tree.insert(3)
    tree.insert(7)
    tree.insert(13)
    tree.insert(17)

    tree.delete(10)

    assertEquals(tree.contains(10), false)
    assertEquals(tree?.root?.value, 13)
    assertEquals(tree?.root?.left?.value, 5)
    assertEquals(tree?.root?.right?.value, 15)
  }
)

Deno.test("RedBlackTree - Deletion - Deleting a non-existing node", () => {
  const tree = new RedBlackTree()

  tree.insert(10)
  tree.insert(5)
  tree.insert(15)

  tree.delete(7)

  assertEquals(tree.contains(7), false)
  assertEquals(tree?.root?.value, 10)
  assertEquals(tree?.root?.left?.value, 5)
  assertEquals(tree?.root?.right?.value, 15)
})
