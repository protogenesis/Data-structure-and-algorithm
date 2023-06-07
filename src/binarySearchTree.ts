type NodeOrEmpty = Node | undefined | null
class Node {
  public left: NodeOrEmpty
  public right: NodeOrEmpty

  constructor(public value: number) {
    this.value = value
    this.left = null
    this.right = null
  }
}

class BinarySearchTree {
  public root: NodeOrEmpty
  constructor() {
    this.root = null
  }

  isEmpty() {
    return this.root === null
  }

  insert(value: number) {
    const node = new Node(value)
    if (this.isEmpty()) {
      this.root = node
    } else {
      this.insertNode(this.root, node)
    }
  }

  insertNode(root: NodeOrEmpty, node: NodeOrEmpty) {
    if (node && root && node.value < root.value) {
      if (root.left === null) {
        root.left = node
      } else {
        this.insertNode(root.left, node)
      }
    } else {
      if (root?.right === null) {
        root.right = node
      } else {
        this.insertNode(root?.right, node)
      }
    }
  }

  search(value: number) {
    return this.searchNode(this.root, value)
  }

  searchNode(root: NodeOrEmpty, value: number): boolean {
    if (root === null) {
      return false
    }
    if (value === root?.value) {
      return true
    } else if (root && value < root.value) {
      return this.searchNode(root.left, value)
    } else {
      return this.searchNode(root?.right, value)
    }
  }

  preorder(root: NodeOrEmpty) {
    if (root !== null) {
      console.log(root?.value)
      this.preorder(root?.left)
      this.preorder(root?.right)
    }
  }

  inorder(root: NodeOrEmpty) {
    if (root !== null) {
      this.inorder(root?.left)
      console.log(root?.value)
      this.inorder(root?.right)
    }
  }

  postorder(root: NodeOrEmpty) {
    if (root !== null) {
      this.postorder(root?.left)
      this.postorder(root?.right)
      console.log(root?.value)
    }
  }

  levelOrder() {
    // debugger
    const queue = []

    if (this.root !== null) {
      queue.push(this.root)
    }

    while (queue.length) {
      const node = queue.shift()
      console.log(node?.value)

      if (node?.left) {
        queue.push(node?.left)
      }
      if (node?.right) {
        queue.push(node?.right)
      }
    }
  }
}

const bst = new BinarySearchTree()
bst.insert(10)
bst.insert(5)
bst.insert(3)
bst.insert(7)
bst.insert(15)
// console.log(bst.search(20))
bst.levelOrder()
