// Every path from the root to a leaf contains the same number of black nodes.
// https://math.stackexchange.com/questions/1685705/black-depth-in-red-black-tree

class Node {
  constructor(key, value) {
    this.key = key
    this.value = value
    this.left = null
    this.right = null
    this.color = Node.RED
  }

  static get RED() {
    return 0
  }
  static get BLACK() {
    return 1
  }
}

class RedBlackTree {
  constructor() {
    this.root = null
  }

  insert(key, value) {
    this.root = this._insert(this.root, key, value)
    this.root.color = Node.BLACK
  }

  _insert(node, key, value) {
    if (!node) {
      return new Node(key, value)
    }

    if (key < node.key) {
      node.left = this._insert(node.left, key, value)
    } else if (key > node.key) {
      node.right = this._insert(node.right, key, value)
    } else {
      node.value = value
    }

    if (this._isRed(node.right) && !this._isRed(node.left)) {
      node = this._rotateLeft(node)
    }
    if (this._isRed(node.left) && this._isRed(node.left.left)) {
      node = this._rotateRight(node)
    }
    if (this._isRed(node.left) && this._isRed(node.right)) {
      this._flipColors(node)
    }

    return node
  }

  delete(key) {
    if (!this.contains(key)) {
      return
    }

    this.root = this._delete(this.root, key)
    if (this.root) {
      this.root.color = Node.BLACK
    }
  }

  _delete(node, key) {
    if (key < node.key) {
      if (!this._isRed(node.left) && !this._isRed(node.left.left)) {
        node = this._moveRedLeft(node)
      }
      node.left = this._delete(node.left, key)
    } else {
      if (this._isRed(node.left)) {
        node = this._rotateRight(node)
      }
      if (key === node.key && !node.right) {
        return null
      }
      if (!this._isRed(node.right) && !this._isRed(node.right.left)) {
        node = this._moveRedRight(node)
      }
      if (key === node.key) {
        const minNode = this._minNode(node.right)
        node.key = minNode.key
        node.value = minNode.value
        node.right = this._deleteMin(node.right)
      } else {
        node.right = this._delete(node.right, key)
      }
    }

    return this._fixUp(node)
  }

  contains(key) {
    let node = this.root
    while (node) {
      if (key === node.key) {
        return true
      } else if (key < node.key) {
        node = node.left
      } else {
        node = node.right
      }
    }
    return false
  }

  _isRed(node) {
    return node ? node.color === Node.RED : false
  }

  _rotateLeft(node) {
    const x = node.right
    node.right = x.left
    x.left = node
    x.color = node.color
    node.color = Node.RED
    return x
  }

  _rotateRight(node) {
    const x = node.left
    node.left = x.right
    x.right = node
    x.color = node.color
    node.color = Node.RED
    return x
  }

  _flipColors(node) {
    node.color = Node.RED
    node.left.color = Node.BLACK
    node.right.color = Node.BLACK
  }

  _moveRedLeft(node) {
    this._flipColors(node)
    if (this._isRed(node.right.left)) {
      node.right = this._rotateRight(node.right)
      node = this._rotateLeft(node)
      this._flipColors(node)
    }
    return node
  }

  _moveRedRight(node) {
    this._flipColors(node)
    if (this._isRed(node.left.left)) {
      node = this._rotateRight(node)
      this._flipColors(node)
    }
    return node
  }

  _minNode(node) {
    while (node.left) {
      node = node.left
    }
    return node
  }

  _deleteMin(node) {
    if (!node.left) {
      return null
    }
    if (!this._isRed(node.left) && !this._isRed(node.left.left)) {
      node = this._moveRedLeft(node)
    }
    node.left = this._deleteMin(node.left)
    return this._fixUp(node)
  }

  _fixUp(node) {
    if (this._isRed(node.right)) {
      node = this._rotateLeft(node)
    }
    if (this._isRed(node.left) && this._isRed(node.left.left)) {
      node = this._rotateRight(node)
    }
    if (this._isRed(node.left) && this._isRed(node.right)) {
      this._flipColors(node)
    }
    return node
  }
}

const tree = new RedBlackTree()

// Insert some nodes
tree.insert(10, "ten")
tree.insert(20, "twenty")
tree.insert(30, "thirty")
tree.insert(15, "fifteen")
tree.insert(25, "twenty-five")

// Check if the tree contains some keys
console.log(tree.contains(10)) // true
console.log(tree.contains(15)) // true
console.log(tree.contains(35)) // false

// Delete some nodes
tree.delete(15)
tree.delete(30)

// Check if the deleted nodes are no longer in the tree
console.log(tree.contains(15)) // false
console.log(tree.contains(30)) // false

// Check the tree's structure and ordering
console.log(tree.root.key) // 20
console.log(tree.root.left.key) // 10
console.log(tree.root.right.key) // 25
