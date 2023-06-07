type NodeOrEmpty = Node | undefined | null
class Node {
  public next: NodeOrEmpty
  constructor(public value: number) {
    this.value = value
    this.next = null
  }
}

class LinkedList {
  public size: number
  public head: NodeOrEmpty

  constructor() {
    this.head = null
    this.size = 0
  }
  isEmpty() {
    return this.size === 0
  }
  getSize() {
    return this.size
  }
  print() {
    if (this.size === 0) {
      console.log("empty list")
      return
    }

    let str = ""
    let curr = this.head
    while (curr) {
      str += `${curr.value} `
      curr = curr.next
    }

    console.log(str)
  }
  prepend(value: number) {
    const node = new Node(value)
    if (this.size !== 0) {
      node.next = this.head
    }
    this.head = node

    this.size++
  }
  append(value: number) {
    const node = new Node(value)
    if (this.size === 0) {
      this.head = node
    } else {
      let prev = this.head
      while (prev?.next) {
        prev = prev.next
      }
      if (prev) {
        prev.next = node
      }
    }

    this.size++
  }
  insert(value: number, index: number) {
    if (index < 0 || index >= this.getSize()) {
      return
    }

    const node = new Node(value)
    let prev = this.head
    for (let i = 0; i < index - 1; i++) {
      prev = prev?.next
    }

    node.next = prev?.next
    if (prev?.next) {
      prev.next = node
    }

    this.size++
  }
  remove(index: number) {
    let removedElement = null
    if (index < 0 || index >= this.size) {
      return null
    }

    let prev = this.head
    for (let i = 0; i < index - 1; i++) {
      prev = prev?.next
    }
    removedElement = prev?.next
    if (prev?.next) {
      prev.next = removedElement?.next
    }

    this.size--

    return removedElement?.value
  }
  removeValue(value: number) {
    if (this.isEmpty()) {
      return null
    }

    let removedElement = null

    if (this.head?.value === value) {
      removedElement = this.head
      this.head = removedElement.next
      this.size--
      return removedElement
    }

    let prev = this.head

    while (prev?.next) {
      if (prev.next.value === value) {
        removedElement = prev.next
        prev.next = removedElement.next
        this.size--
        break
      }
      prev = prev.next
    }

    return removedElement
  }
  search(value: number) {
    if (this.isEmpty()) {
      return -1
    }

    let index = 0
    let curr = this.head
    while (curr) {
      if (curr.value === value) {
        return index
      }
      curr = curr.next
      index++
    }
    return -1
  }
  reverse() {
    let prev = null
    let curr = this.head

    while (curr) {
      const next = curr.next
      curr.next = prev
      prev = curr
      curr = next
    }

    this.head = prev
  }
}

const linkedList = new LinkedList()
linkedList.prepend(10)
linkedList.print()
linkedList.append(20)
linkedList.append(30)
linkedList.print()
linkedList.reverse()
linkedList.print()
