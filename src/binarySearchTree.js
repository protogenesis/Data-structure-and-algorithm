class Node {
  constructor(value) {
    this.value = value
    this.left = null
    this.right = null
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null  
  }

  isEmpty() {
    return this.root === null
  }

  insert(value) {
    const node = new Node(value)
    if(this.isEmpty()) {
      this.root = node
    }else {
      this.insertNode(this.root, node)
    }
  }

  insertNode(root, node) {
    if(node.value < root.value) {
      if(root.left === null) {
        root.left = node
      }else {
        this.insertNode(root.left, node)
      }
    }else {
      if(root.right === null) {
        root.right = node
      }else {
        this.insertNode(root.right, node)
      }
    }
  }

  search(value) {
      return this.searchNode(this.root, value)
  }

  searchNode(root, value) {
    if(root === null) {
      return false
    }
    if(value === root.value) {
        return true
    }else if(value < root.value) {
      return this.searchNode(root.left, value)
    }else {
      return this.searchNode(root.right, value)
    }
  }

  preorder(root) {
    if(root !== null) {
      console.log(root.value)
      this.preorder(root.left)
      this.preorder(root.right)
    }
  }

  inorder(root) {
    if(root !== null) {
      this.inorder(root.left)
      console.log(root.value)
      this.inorder(root.right)
    }
  }

  postorder(root) {
    if(root !== null) {
      this.postorder(root.left)
      this.postorder(root.right)
      console.log(root.value)
    }
  }

  levelOrder() {
    const queue = []
    
    if(this.root !== null) {
      queue.push(this.root)
    }

    while(queue.length) {
      const node = queue.shift()
      console.log(node.value)

      if(node.left) {
        queue.push(node.left)
      }
      if(node.right) {
        queue.push(node.right)
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
console.log(bst.levelOrder())