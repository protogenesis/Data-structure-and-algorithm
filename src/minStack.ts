export default class MinStack {
  public stack: number[]
  public minStack: number[]

  constructor() {
    this.stack = []
    this.minStack = []
  }

  pop() {
    if (!this.stack.length) {
      return null
    }

    const last = this.stack.pop()
    if (last === this.minStack.at(-1)) {
      this.minStack.pop()
    }

    return last
  }

  top() {
    if (!this.stack.length) {
      return null
    }

    return this.stack.at(-1)
  }

  push(val: number) {
    this.stack.push(val)

    if (this.minStack.length === 0 || val < (this.minStack.at(-1) as number)) {
      this.minStack.push(val)
    }
  }

  getMin() {
    if (!this.minStack.length) {
      return null
    }

    return this.minStack.at(-1)
  }
}