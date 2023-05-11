const RedBlackTree = require("../src/redBlackTree")

// Helper function to create a RedBlackTree from an array of keys
function createTree(keys) {
  const tree = new RedBlackTree()
  for (const key of keys) {
    tree.insert(key)
  }
  return tree
}

describe("RedBlackTree", () => {
  describe("insert", () => {
    it("should insert a node into the tree", async () => {
      const tree = new RedBlackTree()

      // Insert a node.
      tree.insert(1)

      // Check that the node is in the tree.
      expect(tree.contains(1)).toBe(true)
    })

    it("should insert multiple nodes into the tree", async () => {
      const tree = new RedBlackTree()

      // Insert two nodes.
      tree.insert(1)
      tree.insert(2)

      // Check that both nodes are in the tree.
      expect(tree.contains(1)).toBe(true)
      expect(tree.contains(2)).toBe(true)
    })
  })
  // Test case: Deletion
  describe("Red-Black Tree - Deletion", () => {
    let tree

    beforeEach(() => {
      tree = new RedBlackTree()
    })

    test("Deleting a leaf node", () => {
      tree.insert(10)
      tree.insert(5)
      tree.insert(15)
      tree.insert(3)
      tree.insert(7)

      tree.delete(3)

      expect(tree.contains(3)).toBe(false)
      expect(tree.root.left.left).toBe(null)
    })

    test("Deleting a node with one child", () => {
      tree.insert(10)
      tree.insert(5)
      tree.insert(15)
      tree.insert(3)
      tree.insert(7)

      tree.delete(15)

      expect(tree.contains(15)).toBe(false)
      expect(tree.root.right.value).toBe(10)
    })

    test("Deleting a node with two children", () => {
      tree.insert(10)
      tree.insert(5)
      tree.insert(15)
      tree.insert(3)
      tree.insert(7)
      tree.insert(13)
      tree.insert(17)

      tree.delete(15)

      expect(tree.contains(15)).toBe(false)
      expect(tree.root.right.value).toBe(17)
      expect(tree.root.right.left.value).toBe(13)
    })

    test("Deleting the root node with two children", () => {
      tree.insert(10)
      tree.insert(5)
      tree.insert(15)
      tree.insert(3)
      tree.insert(7)
      tree.insert(13)
      tree.insert(17)

      tree.delete(10)

      expect(tree.contains(10)).toBe(false)
      expect(tree.root.value).toBe(13)
      expect(tree.root.left.value).toBe(5)
      expect(tree.root.right.value).toBe(15)
    })

    test("Deleting a non-existing node", () => {
      tree.insert(10)
      tree.insert(5)
      tree.insert(15)

      tree.delete(7)

      expect(tree.contains(7)).toBe(false)
      expect(tree.root.value).toBe(10)
      expect(tree.root.left.value).toBe(5)
      expect(tree.root.right.value).toBe(15)
    })
  })
})
