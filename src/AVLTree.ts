class Node {
  height: number
  left: Node | null
  right: Node | null
  constructor(public value: number) {
    this.value = value
    this.height = 1
    this.left = null
    this.right = null
  }
}

class AVLTree {
  root: Node | null
  constructor() {
    this.root = null
  }

  insert(value: number) {
    const node = new Node(value)
    this.root = this.insertNode(this.root, node)
  }

  insertNode(root: Node | null, node: Node) {
    const value = node.value

    if (!root) {
      return node
    }

    if (value && value < root.value) {
      root.left = this.insertNode(root.left, node)
    } else {
      root.right = this.insertNode(root.right, node)
    }

    root.height = this.getHeight(root)

    const balanceFactor = this.getBalanceFactor(root)

    if (balanceFactor > 1 && root.left && value < root.left.value) {
      // left left case
      root = this.rightRotation(root)
    } else if (balanceFactor > 1 && root.left && value > root.left.value) {
      // left right case
      root.left = this.leftRotation(root.left)
      root = this.rightRotation(root)
    } else if (balanceFactor < -1 && root.right && value < root.right.value) {
      // right left case
      root.right = this.rightRotation(root.right)
      root = this.leftRotation(root)
    } else if (balanceFactor < -1 && root.right && value > root.right.value) {
      // right right case
      root = this.leftRotation(root)
    }

    return root
  }

  getBalanceFactor(node: Node) {
    let leftHeight = 0
    let rightHeight = 0

    if (node.left) {
      leftHeight = node.left.height
    }

    if (node.right) {
      rightHeight = node.right.height
    }

    return leftHeight - rightHeight
  }

  leftRotation(node: Node) {
    const right = node.right
    if (!right) {
      return node
    }

    const leftSubTree = right.left

    right.left = node
    node.right = leftSubTree

    node.height = this.getHeight(node)
    right.height = this.getHeight(right)

    return right
  }

  rightRotation(node: Node) {
    const left = node.left
    if (!left) {
      return left
    }
    const rightSubTree = left.right

    left.right = node
    node.left = rightSubTree

    node.height = this.getHeight(node)
    left.height = this.getHeight(left)

    return left
  }

  getHeight(node: Node) {
    if (!node) {
      return 0
    }

    const leftHeight = node.left?.height ?? 0
    const rightHeight = node.right?.height ?? 0

    return Math.max(leftHeight, rightHeight) + 1
  }

  findMinSubNode(node: Node) {
    if (!node) {
      return node
    }

    let current = node

    while (current?.left) {
      current = current.left
    }

    return current
  }

  remove(value: number) {
    this.root = this.removeNode(this.root, value)
  }

  removeNode(root: Node | null, value: number) {
    if (!root) {
      return null
    }

    if (value < root.value) {
      root.left = this.removeNode(root.left, value)
    } else if (value > root.value) {
      root.right = this.removeNode(root.right, value)
    } else {
      if (!root.left && !root.right) {
        return null
      } else if (!root.left) {
        root = root.right
      } else if (!root.right) {
        root = root.left
      } else {
        const left = root.left
        const right = root.right

        root = this.findMinSubNode(right)

        root.right = this.removeNode(right, root.value)
        root.left = left
      }
    }

    if(!root) {
      return root
    }

    root.height = this.getHeight(root)

    return root
  }

  search(root: Node | null, value: number): Node | null {
    if (!root) {
      return root
    }

    if (value === root.value) {
      return root
    } else if (value < root.value) {
      return this.search(root.left, value)
    } else {
      return this.search(root.right, value)
    }
  }

  preOrder(root: Node | null) {
    if (!root) {
      return
    }
    const current = root

    console.log(current.value)
    this.preOrder(current.left)
    this.preOrder(current.right)
  }
}
export default AVLTree

// const tree = new AVLTree()

// tree.insert(10)
// tree.insert(20)
// tree.insert(42)
// tree.insert(40)
// tree.insert(50)
// tree.insert(24)
// tree.insert(52)
// tree.insert(53)

// tree.remove(40)

// console.log(tree.search(tree.root, 40))
