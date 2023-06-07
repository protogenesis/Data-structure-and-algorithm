const WeightedGraph = require("./weightedGraph")

const wg = new WeightedGraph()
const vertexA = wg.addVertex("A")
const vertexB = wg.addVertex("B")
const vertexC = wg.addVertex("C")
const vertexD = wg.addVertex("D")
const vertexE = wg.addVertex("E")
const vertexF = wg.addVertex("F")

wg.addEdge(vertexA, vertexB, 1)
wg.addEdge(vertexA, vertexC, 3)
wg.addEdge(vertexB, vertexD, 4)
wg.addEdge(vertexC, vertexD, 6)
wg.addEdge(vertexD, vertexE, 50)
wg.addEdge(vertexE, vertexF, 54)

function findMST(graph) {
  let curr = graph.vertices.values().next().value
  const mst = new WeightedGraph()

  while (curr) {
    const startNode = mst.addVertex(curr.value)

    let min = null
    for (const [vertex, weight] of curr.children) {
      if (min === null) {
        min = vertex
      }

      if (weight < curr.children.get(min)) {
        min = vertex
      }
    }

    startNode.children.set(min, curr.children.get(min))
    curr = min
  }

  return mst
}

findMST(wg)
