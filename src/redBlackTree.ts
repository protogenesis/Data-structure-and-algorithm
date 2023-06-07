type NodeOrNull = Node | null
class Node {
  public parent: NodeOrNull
  public left: NodeOrNull
  public right: NodeOrNull
  public color: 0 | 1
  constructor(public value: number) {
    this.value = value
    this.parent = null
    this.left = null
    this.right = null
    this.color = Node.red
  }

  static black = 0 as const
  static red = 1 as const
}

class RedBlackTree {
  root: NodeOrNull
  constructor() {
    this.root = null
  }

  insert(value: number) {
    const node = new Node(value)

    if (!this.root) {
      this.root = node
      this.root.color = Node.black
    } else {
      let current = this.root
      let parent = null

      while (true) {
        parent = current
        if (value < current.value) {
          if (!current.left) {
            current.left = node
            node.parent = current

            break
          }
          current = current.left
        } else {
          if (!current.right) {
            current.right = node
            node.parent = current

            break
          }

          current = current.right
        }
      }

      this._fixInsert(node)
    }
  }

  _fixInsert(node: Node) {
    while (node.parent && node.parent.color === Node.red) {
      const parent = node.parent
      const grandParent = parent.parent

      if (grandParent && grandParent.left === parent) {
        const uncle = grandParent.right

        if (uncle && uncle.color === Node.red) {
          parent.color = Node.black
          uncle.color = Node.black
          grandParent.color = Node.red

          node = grandParent
        } else {
          if (parent.right === node) {
            this.rotateLeft(parent)

            grandParent.left = node
          }
          grandParent.left.color = Node.black
          grandParent.color = Node.red

          this.rotateRight(grandParent)
        }
      } else {
        const uncle = grandParent?.left

        if (uncle && uncle.color === Node.red) {
          parent.color = Node.black
          uncle.color = Node.black
          grandParent.color = Node.red

          node = grandParent
        } else {
          if (parent.left === node) {
            this.rotateRight(parent)

            if (grandParent) {
              grandParent.right = node
            }
          }

          if (grandParent) {
            if (grandParent.right) {
              grandParent.right.color = Node.black
            }
            grandParent.color = Node.red
          }

          this.rotateLeft(grandParent)
        }
      }
    }

    if (this.root) {
      this.root.color = Node.black
    }
  }

  rotateLeft(node: NodeOrNull) {
    if (!node?.right) {
      return node
    }

    const right = node.right
    const left = right.left

    node.right = left

    if (left && node.right) {
      node.right.parent = node
    }

    if (!node.parent) {
      this.root = right
    }

    right.left = node
    right.parent = node.parent
    node.parent = right
  }

  rotateRight(node: NodeOrNull) {
    if (!node?.left) {
      return node
    }
    const left = node.left
    const right = left.right

    node.left = right
    if (right && node.left) {
      node.left.parent = node
    }

    if (!node.parent) {
      this.root = left
    }

    left.right = node
    left.parent = node.parent
    node.parent = left
  }

  delete(value: number) {
    let current = this.root
    let u = null

    while (current) {
      const parent = current.parent

      if (value < current.value) {
        current = current.left
      } else if (value > current.value) {
        current = current.right
      } else {
        if (current.left && current.right) {
          const inOrderSuccessor = this._findMinRightLeftNode(current) ?? null

          if (inOrderSuccessor?.value) {
            this.delete(inOrderSuccessor.value)
          }

          current.left.parent = inOrderSuccessor
          if (current.right) {
            current.right.parent = inOrderSuccessor
          }

          if (inOrderSuccessor) {
            inOrderSuccessor.left = current.left
            inOrderSuccessor.right = current.right
            inOrderSuccessor.parent = parent
          }
          if (!parent) {
            this.root = inOrderSuccessor
            if (this.root) {
              this.root.color = Node.red
            }
            break
          } else if (parent.left === current) {
            parent.left = inOrderSuccessor
          } else {
            parent.right = inOrderSuccessor
          }

          if (
            (current.color === Node.red ||
              inOrderSuccessor?.color === Node.red) &&
            inOrderSuccessor
          ) {
            inOrderSuccessor.color = Node.black
          } else {
            u = inOrderSuccessor
            this._fixDelete(u)
          }
          break
        } else if (current.left) {
          if (!parent) {
            this.root = current.left
            this.root.parent = null
            this.root.color = Node.black

            break
          }

          if (parent.left === current) {
            parent.left = current.left
          } else {
            parent.right = current.left
          }
          current.left.parent = parent

          if (current.color === Node.red || current.left.color === Node.red) {
            current.left.color = Node.black
          } else {
            u = current.left
            this._fixDelete(u)
          }
          break
        } else if (current.right) {
          if (!parent) {
            this.root = current.right
            this.root.parent = null
            this.root.color = Node.black
            break
          }

          if (parent.left === current) {
            parent.left = current.right
          } else {
            parent.right = current.right
          }
          current.right.parent = parent

          if (current.color === Node.red || current.right.color === Node.red) {
            current.right.color = Node.black
          } else {
            u = current.right
            this._fixDelete(u)
          }
          break
        } else {
          u = new Node(Infinity)
          u.parent = parent

          if (current.color === Node.black) {
            if (parent?.left === current) {
              parent.left = u
            } else if (parent?.right) {
              parent.right = u
            }
            this._fixDelete(u)
          } else {
            if (parent?.left === current) {
              parent.left = null
            } else if (parent?.right) {
              parent.right = null
            }
          }
          break
        }
      }
    }
  }

  _findMinRightLeftNode(node: NodeOrNull) {
    let left = node?.right

    while (left && left.left) {
      left = left.left
    }

    return left
  }

  _fixDelete(node: NodeOrNull) {
    const parent = node?.parent ?? null
    let sibling: NodeOrNull | null = null

    function handleBlackSiblingChildren(this: RedBlackTree) {
      if (sibling?.color) {
        sibling.color = Node.red
      }

      if (parent === this.root) {
        return
      }

      if (parent?.color === Node.red) {
        parent.color = Node.black
      } else {
        this._fixDelete(parent)
      }
    }

    if (parent?.left === node) {
      sibling = parent.right
    } else {
      sibling = parent?.left ?? null
    }

    if (parent?.left === sibling) {
      if (sibling?.color === Node.black) {
        if (sibling.left && sibling.left.color === Node.red) {
          sibling.left.color = Node.black
          this.rotateRight(parent)
        } else if (sibling.right && sibling.right.color === Node.red) {
          sibling.color = Node.red
          sibling.right.color = Node.black

          this.rotateLeft(sibling)
          this.rotateRight(parent)
        } else {
          handleBlackSiblingChildren.call(this)
        }
      } else {
        if (sibling) {
          sibling.color = Node.black
        }
        parent.color = Node.red

        this.rotateRight(parent)
        this._fixDelete(node)
      }
    } else {
      if (sibling?.color === Node.black) {
        if (sibling.right && sibling.right.color === Node.red) {
          sibling.right.color = Node.black
          this.rotateLeft(parent)
        } else if (sibling.left && sibling.left.color === Node.red) {
          sibling.left.color = Node.black
          sibling.color = Node.red
          this.rotateRight(sibling)
          this.rotateLeft(parent)
        } else {
          handleBlackSiblingChildren.call(this)
        }
      } else {
        if (sibling) {
          sibling.color = Node.black
        }
        if (parent) {
          parent.color = Node.red
        }

        this.rotateLeft(parent)
        this._fixDelete(node)
      }
    }

    if (node?.value === Infinity) {
      if (parent?.left === node) {
        parent.left = null
      } else {
        if (parent) {
          parent.right = null
        }
      }
    }
  }

  contains(value: number) {
    let current = this.root

    while (current) {
      if (current.value === value) {
        return true
      } else if (current.value > value) {
        current = current.left
      } else {
        current = current.right
      }
    }

    return false
  }
}

// const tree = new RedBlackTree()
// tree.insert(30)
// tree.insert(20)
// tree.insert(40)
// tree.insert(50)
// tree.insert(35)

// tree.delete(20)
// tree.insert(60)
// tree.insert(45)
// debugger
// tree.delete(50)

export default RedBlackTree
