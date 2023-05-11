class CircularQueue {
  constructor(capacity) {
    this.items = new Array(capacity)
    this.rear = -1
    this.front = -1
    this.capacity = capacity
    this.currentLength = 0    
  }

  enqueue(element) {
    if(!this.isFull()) {
      this.rear = (this.rear + 1) % this.capacity
      this.items[this.rear] = element
      this.currentLength++
      if(this.front === -1) {
        this.front = 0
      }
      console.log(this.items)
    }
  }

  dequeue() {
    if(this.isEmpty()) {
      return null
    }
    const item = this.items[this.front]
    this.items[this.front] = null
    this.front = (this.front + 1) % this.capacity
    this.currentLength--
    console.log(this.items)
    return item
  }

  isFull() {
    return this.currentLength === this.capacity
  }

  isEmpty() {
    return this.currentLength === 0
  }

  peek() {
    if(this.isEmpty()) {
      return null
    }
    return this.items[this.front]
  }

  size() {
    return this.currentLength
  }
}

const circularQueue = new CircularQueue(5)

circularQueue.enqueue(1)
circularQueue.dequeue()
circularQueue.enqueue(2)
circularQueue.enqueue(3)
circularQueue.enqueue(4)
circularQueue.enqueue(5)
circularQueue.enqueue(6)
circularQueue.dequeue()
circularQueue.dequeue()
circularQueue.dequeue()
circularQueue.dequeue()
circularQueue.dequeue()
circularQueue.enqueue(7)
circularQueue.enqueue(8)
circularQueue.enqueue(9)
circularQueue.enqueue(10)
circularQueue.enqueue(11)

