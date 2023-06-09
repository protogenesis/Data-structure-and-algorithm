class Node {
  constructor(public value: string, public priority: number) {
    this.value = value
    this.priority = priority
  }
}

class PriorityQueue {
  public queue: Node[]
  public size: number
  constructor() {
    this.queue = []
    this.size = 0
  }

  isEmpty() {
    return this.size === 0
  }

  getSize() {
    return this.size
  }

  enqueue(value: string, priority: number) {
    const node = new Node(value, priority)

    for (let i = 0; i < this.queue.length; i++) {
      5
      if (this.queue[i].priority < priority) {
        this.queue.splice(i, 0, node)
        this.size++
        return
      }
    }

    this.queue.push(node)
    this.size++
  }

  dequeue() {
    const node = this.queue.shift()
    return node
  }

  print() {
    for (let i = 0; i < this.queue.length; i++) {
      const node = this.queue[i]
      console.log(`${node.priority} => ${node.value}`)
    }
  }
}

const queue = new PriorityQueue()
queue.enqueue("low", 1)
queue.enqueue("high", 10)
queue.enqueue("medium", 5)
queue.print()
queue.dequeue()
queue.print()
