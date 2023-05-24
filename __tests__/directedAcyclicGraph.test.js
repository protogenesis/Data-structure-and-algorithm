const DAG = require("../src/directedAcyclicGraph")

describe("DAG", () => {
  let dag

  beforeEach(() => {
    dag = new DAG()
  })

  test("should perform a topological sort on a complex DAG", () => {
    const nodeA = dag.addVertex("A")
    const nodeB = dag.addVertex("B")
    const nodeC = dag.addVertex("C")
    const nodeD = dag.addVertex("D")
    const nodeE = dag.addVertex("E")
    const nodeF = dag.addVertex("F")
    const nodeG = dag.addVertex("G")

    dag.addEdge(nodeA, nodeB)
    dag.addEdge(nodeA, nodeC)
    dag.addEdge(nodeB, nodeD)
    dag.addEdge(nodeB, nodeE)
    dag.addEdge(nodeC, nodeE)
    dag.addEdge(nodeD, nodeF)
    dag.addEdge(nodeE, nodeF)
    dag.addEdge(nodeF, nodeG)

    const sortedNodes = dag.topologicalSort()
    const sortedValues = sortedNodes.map((node) => node.value)

    expect(sortedValues).toEqual(["A", "C", "B", "E", "D", "F", "G"])
  })

  test("should check whether a DAG is acyclic", () => {
    const nodeA = dag.addVertex("a")
    const nodeB = dag.addVertex("b")
    const nodeC = dag.addVertex("c")
    const nodeD = dag.addVertex("d")
    const nodeE = dag.addVertex("e")

    dag.addEdge(nodeA, nodeB)
    dag.addEdge(nodeA, nodeC)
    dag.addEdge(nodeB, nodeD)
    dag.addEdge(nodeC, nodeD)
    dag.addEdge(nodeD, nodeE)

    const isAcyclic = dag.isAcyclic()
    expect(isAcyclic).toBe(true)
  })

  test("should return true for an acyclic graph", () => {
    const nodeA = dag.addVertex("A")
    const nodeB = dag.addVertex("B")
    const nodeC = dag.addVertex("C")
    const nodeD = dag.addVertex("D")
    const nodeE = dag.addVertex("E")

    dag.addEdge(nodeA, nodeB)
    dag.addEdge(nodeA, nodeC)
    dag.addEdge(nodeB, nodeD)
    dag.addEdge(nodeC, nodeD)
    dag.addEdge(nodeD, nodeE)

    const isAcyclic = dag.isAcyclic()

    expect(isAcyclic).toBe(true)
  })

  test("should return false for a cyclic graph", () => {
    const nodeA = dag.addVertex("A")
    const nodeB = dag.addVertex("B")
    const nodeC = dag.addVertex("C")
    const nodeD = dag.addVertex("D")

    dag.addEdge(nodeA, nodeB)
    dag.addEdge(nodeB, nodeC)
    dag.addEdge(nodeC, nodeD)
    dag.addEdge(nodeD, nodeA)

    const isAcyclic = dag.isAcyclic()

    expect(isAcyclic).toBe(false)
  })

  test("should return true for an empty graph", () => {
    const isAcyclic = dag.isAcyclic()

    expect(isAcyclic).toBe(true)
  })

  test("should return true for a graph with a single vertex", () => {
    const nodeA = dag.addVertex("A")

    const isAcyclic = dag.isAcyclic()

    expect(isAcyclic).toBe(true)
  })

  test("should return true for a disconnected acyclic graph", () => {
    const nodeA = dag.addVertex("A")
    const nodeB = dag.addVertex("B")
    const nodeC = dag.addVertex("C")
    const nodeD = dag.addVertex("D")

    dag.addEdge(nodeA, nodeB)
    dag.addEdge(nodeC, nodeD)

    const isAcyclic = dag.isAcyclic()

    expect(isAcyclic).toBe(true)
  })

  test("should handle disconnected nodes in the DAG", () => {
    const nodeA = dag.addVertex("A")
    const nodeB = dag.addVertex("B")
    const nodeC = dag.addVertex("C")
    const nodeD = dag.addVertex("D")

    dag.addEdge(nodeA, nodeB)
    dag.addEdge(nodeC, nodeD)

    const sortedNodes = dag.topologicalSort()
    const sortedValues = sortedNodes.map((node) => node.value)

    expect(sortedValues).toEqual(["C", "D", "A", "B"])
  })

  test("should return false for a graph with a self-loop", () => {
    const nodeA = dag.addVertex("A")
    dag.addEdge(nodeA, nodeA)

    const isAcyclic = dag.isAcyclic()

    expect(isAcyclic).toBe(false)
  })

  test("should handle a single node in the DAG", () => {
    const nodeA = dag.addVertex("A")

    const sortedNodes = dag.topologicalSort()
    const sortedValues = sortedNodes.map((node) => node.value)

    expect(sortedValues).toEqual(["A"])
  })
})
