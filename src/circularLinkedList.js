class Node {
  constructor(value) {
    this.value = value
    this.next = null
  }
}

class CircularLinkedList {
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

  add(value) {
    const node = new Node(value)

    if(this.isEmpty()) {
      this.head = node
    }else {
      let current = this.head

      while(current.next !== this.head) {
        current = current.next
      }

      current.next = node
    }
    
    node.next = this.head
    this.size++
  }

  remove(value) {
    if(this.isEmpty()) {
      return null
    }
    let current = this.head
    let prev = null
    if(current.value === value) {
      const removedNode = this.head
      this.head = removedNode.next
      while(current.next !== removedNode) {
        current = current.next
      }
      current.next = this.head
      return removedNode.value
    }
    let founded = false
    while(current.next !== this.head) {
      if(current.value === value) {
        founded = true
        break
      }
      prev = current
      current = current.next
    }
    if(prev && founded) {
      prev.next = current.next
      return current.value
    }
    return null
  }

  print() {
    if(this.isEmpty()) {
      console.log('empty list')
      return null
    }
    
    let current = this.head
    while(current.next !== this.head) {
      console.log(current.value)
      current = current.next
    }
    console.log(current.value)
  }
}

const list = new CircularLinkedList()

list.add(1)
list.add(2)
list.add(3)
list.add(4)
list.add(5)
list.add(6)
list.add(7)
list.add(8)
list.add(9)
list.add(10)
list.add(20)
list.add(30)
list.add(40)
list.add(50)
list.add(60)
list.add(70)
list.add(80)
list.add(90)
console.log('removed', list.remove(900))

list.print()



