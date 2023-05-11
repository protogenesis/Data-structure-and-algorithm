const AVLTree = require("../AVLTree")

describe("AVLTree", () => {
  let tree

  beforeEach(() => {
    tree = new AVLTree()
  })

  it("should insert nodes correctly", () => {
    tree.insert(5)
    tree.insert(10)
    tree.insert(15)
    tree.insert(20)

    expect(tree.search(tree.root, 5).value).toBe(5)
    expect(tree.search(tree.root, 10).value).toBe(10)
    expect(tree.search(tree.root, 15).value).toBe(15)
    expect(tree.search(tree.root, 20).value).toBe(20)
  })

  it("should remove nodes correctly", () => {
    tree.insert(5)
    tree.insert(10)
    tree.insert(15)
    tree.insert(20)

    tree.remove(10)
    tree.remove(15)

    expect(tree.search(tree.root, 5).value).toBe(5)
    expect(tree.search(tree.root, 10)).toBe(null)
    expect(tree.search(tree.root, 15)).toBe(null)
    expect(tree.search(tree.root, 20).value).toBe(20)
  })

  it("should balance the tree correctly", () => {
    tree.insert(5)
    tree.insert(10)
    tree.insert(15)
    tree.insert(20)

    expect(tree.root.value).toBe(10)
    expect(tree.root.left.value).toBe(5)
    expect(tree.root.right.value).toBe(15)

    tree.insert(25)

    expect(tree.root.value).toBe(10)
    expect(tree.root.left.value).toBe(5)
    expect(tree.root.right.value).toBe(20)
    expect(tree.root.right.left.value).toBe(15)
    expect(tree.root.right.right.value).toBe(25)
  })
})
