class Node {
  constructor(value) {
    this.value = value
    this.height = 1
    this.left = null
    this.right = null
  }
}

class AVLTree {
  constructor() {
    this.root = null
  }

  insert(value) {
    const node = new Node(value)
    this.root = this.insertNode(this.root, node)
  }

  insertNode(root, node) {
    const value = node.value

    if (!root) {
      return node
    }

    if (value < root.value) {
      root.left = this.insertNode(root.left, node)
    } else {
      root.right = this.insertNode(root.right, node)
    }

    root.height = this.getHeight(root)

    const balanceFactor = this.getBalanceFactor(root)

    if (balanceFactor > 1 && value < root.left.value) {
      // left left case
      root = this.rightRotation(root)
    } else if (balanceFactor > 1 && value > root.left.value) {
      // left right case
      root.left = this.leftRotation(root.left)
      root = this.rightRotation(root)
    } else if (balanceFactor < -1 && value < root.right.value) {
      // right left case
      root.right = this.rightRotation(root.right)
      root = this.leftRotation(root)
    } else if (balanceFactor < -1 && value > root.right.value) {
      // right right case
      root = this.leftRotation(root)
    }

    return root
  }

  getBalanceFactor(node) {
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

  leftRotation(node) {
    const right = node.right
    const leftSubTree = right.left

    right.left = node
    node.right = leftSubTree

    node.height = this.getHeight(node)
    right.height = this.getHeight(right)

    return right
  }

  rightRotation(node) {
    const left = node.left
    const rightSubTree = left.right

    left.right = node
    node.left = rightSubTree

    node.height = this.getHeight(node)
    left.height = this.getHeight(left)

    return left
  }

  getHeight(node) {
    if (!node) {
      return 0
    }

    const leftHeight = node.left?.height ?? 0
    const rightHeight = node.right?.height ?? 0

    return Math.max(leftHeight, rightHeight) + 1
  }

  findMinSubNode(node) {
    if (!node) {
      return null
    }

    let current = node

    while (current?.left) {
      current = current.left
    }

    return current
  }

  remove(value) {
    this.root = this.removeNode(this.root, value)
  }

  removeNode(root, value) {
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

    root.height = this.getHeight(root)

    return root
  }

  search(root, value) {
    if (!root) {
      return null
    }

    if (value === root.value) {
      return root
    } else if (value < root.value) {
      return this.search(root.left, value)
    } else {
      return this.search(root.right, value)
    }
  }

  preOrder(root) {
    if (!root) {
      return
    }
    let current = root

    console.log(current.value)
    this.preOrder(current.left)
    this.preOrder(current.right)
  }
}
module.exports = AVLTree

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
