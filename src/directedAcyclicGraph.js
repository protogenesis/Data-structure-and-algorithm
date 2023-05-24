class Node {
  constructor(value) {
    this.value = value
    this.children = new Set()
  }

  addChild(node) {
    this.children.add(node)
  }
}

class DirectedAcyclicGraph {
  constructor() {
    this.vertices = []
  }

  addVertex(value) {
    const filtered = this.vertices.filter((vertex) =>
      vertex.value.includes(value)
    )

    if (filtered.length) {
      return filtered[0]
    }

    const node = new Node(value)
    this.vertices.push(node)

    return node
  }

  addEdge(source, target) {
    source.addChild(target)
  }

  topologicalSort() {
    const sortedVertices = []
    const visitedVertices = new Set()

    function depthFirstSearch(node) {
      if (visitedVertices.has(node)) {
        return
      }

      visitedVertices.add(node)

      if (node.children) {
        node.children.forEach((child) => {
          depthFirstSearch(child)
        })
      }

      sortedVertices.unshift(node)
    }

    this.vertices.forEach((vertex) => {
      depthFirstSearch(vertex)
    })

    return sortedVertices
  }

  isAcyclic() {
    // 遍历表的子节点
    // 添加子节点到已访问节点变量和递归栈变量中
    // 对子节点的后代节点进行递归
    // 添加后代节点到当前递归栈变量中
    // 如果当前 后代节点 中有与递归栈变量中相同的节点，则存在环形表
    // 如果没有，则删除当前递归栈变量中的这个后代节点

    const visitedVertices = new Set()
    const recursionStack = new Set()

    function hasCycle(node) {
      visitedVertices.add(node)
      recursionStack.add(node)

      for (const child of node.children) {
        if (!recursionStack.has(child)) {
          if (hasCycle(child)) {
            return true
          }
        } else {
          return true
        }
      }

      recursionStack.delete(node)
      return false
    }

    for (const vertex of this.vertices) {
      if (hasCycle(vertex)) {
        return false
      }
    }

    return true
  }
}

module.exports = DirectedAcyclicGraph

// const dag = new DirectedAcyclicGraph()

// const nodeA = dag.addVertex("A")
// const nodeB = dag.addVertex("B")
// const nodeC = dag.addVertex("C")
// const nodeD = dag.addVertex("D")
// const nodeE = dag.addVertex("E")

// dag.addEdge(nodeA, nodeB)
// dag.addEdge(nodeA, nodeC)
// dag.addEdge(nodeB, nodeD)
// dag.addEdge(nodeC, nodeD)
// dag.addEdge(nodeD, nodeE)
// dag.addEdge(nodeE, nodeC)

// // const sortedNodes = dag.topologicalSort()
// // console.log(
// //   "Topological Sort:",
// //   sortedNodes.map((node) => node.value)
// // )

// console.log(dag.isAcyclic())
