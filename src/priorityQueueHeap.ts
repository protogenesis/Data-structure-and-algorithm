class MinHeap {
  heap: number[]

  constructor() {
    this.heap = []
  }

  findParentIndex(index: number): number {
    return Math.floor((index - 1) / 2)
  }

  findLeftChildIndex(index: number): number {
    return index * 2 + 1
  }

  findRightChildIndex(index: number): number {
    return index * 2 + 2
  }

  swap(index1: number, index2: number): void {
    ;[this.heap[index1], this.heap[index2]] = [
      this.heap[index2],
      this.heap[index1],
    ]
  }

  insert(value: number): void {
    this.heap.push(value)
    this.bubbleUp(this.heap.length - 1)
  }

  bubbleUp(index: number): void {
    while (index > 0) {
      const parentIndex = this.findParentIndex(index)

      if (this.heap[parentIndex] > this.heap[index]) {
        this.swap(parentIndex, index)
      }

      index = parentIndex
    }
  }

  extractMin(): number | null {
    if (this.heap.length === 0) {
      return null
    }

    const minValue = this.heap[0]
    const lastValue = this.heap.pop()!

    if (this.heap.length > 0) {
      this.heap[0] = lastValue
      this.bubbleDown()
    }

    return minValue
  }

  bubbleDown(): void {
    let index = 0

    while (true) {
      const leftChildIndex = this.findLeftChildIndex(index)
      const rightChildIndex = this.findRightChildIndex(index)

      let minIndex = index

      if (
        leftChildIndex < this.heap.length &&
        this.heap[leftChildIndex] < this.heap[minIndex]
      ) {
        minIndex = leftChildIndex
      }

      if (
        rightChildIndex < this.heap.length &&
        this.heap[rightChildIndex] < this.heap[minIndex]
      ) {
        minIndex = rightChildIndex
      }

      if (minIndex === index) {
        break
      }

      this.swap(minIndex, index)
      index = minIndex
    }
  }

  isEmpty(): boolean {
    return this.heap.length === 0
  }
}

const minHeap = new MinHeap()
minHeap.insert(5)
minHeap.insert(10)
minHeap.insert(3)
minHeap.insert(7)

console.log(minHeap.extractMin()) // Output: 3
console.log(minHeap.extractMin()) // Output: 5
console.log(minHeap.extractMin()) // Output: 7
console.log(minHeap.extractMin()) // Output: 10
console.log(minHeap.extractMin()) // Output: null (heap is empty)
