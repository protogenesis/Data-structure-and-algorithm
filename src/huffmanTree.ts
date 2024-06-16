class HuffmanNode {
  constructor(
    public char: string | null,
    public freq: number,
    public left: HuffmanNode | null = null,
    public right: HuffmanNode | null = null
  ) {}
}

function buildHuffmanTree(nodes: [string, number][]) {
  const treeNodes = nodes.map((node) => new HuffmanNode(node[0], node[1]))
  treeNodes.sort((a, b) => a.freq - b.freq)

  while (treeNodes.length > 1) {
    const left = treeNodes.shift() as HuffmanNode
    const right = treeNodes.shift() as HuffmanNode
    const node = new HuffmanNode(null, left.freq + right.freq, left, right)
    treeNodes.push(node)
  }

  return treeNodes[0]
}

function buildHuffmanCode(node: HuffmanNode | null, prefix = "", codes: {[key: string]: string} = {}) {
  if (!node?.char) {
    buildHuffmanCode(node?.left ?? null, prefix + "0", codes)
    buildHuffmanCode(node?.right ?? null, prefix + "1", codes)
  } else {
    codes[node.char] = prefix
  }
  return codes
}

function getCharacterFrequencies(str: string) {
  const frequencies = {} as {[key: string]: number}

  for (let s of str) {
    if (frequencies[s]) {
      frequencies[s]++
    } else {
      frequencies[s] = 1
    }
  }

  return Object.entries<number>(frequencies)
}

const text = "this is an example for huffman encoding"

// 获取字符频率表
const codes = getCharacterFrequencies(text)

// const codes = [
// ['A', 5],
//   ['B', 9],
//   ['C', 12],
//   ['D', 13],
//   ['E', 16],
//   ['F', 45],
//   ['G', 50],
//   ['H', 55],
//   ['I', 70],
//   ['J', 80],
//   ['K', 90],
//   ['L', 200],
//   ['M', 2000],
//   ['N', 20000],
//   ['O', 200000],
//   ['P', 2000000],
//   ['Q', 20000000],
//   ['R', 20000000],
//   ['S', 20000000],
//   ['T', 20000000],
//   ['U', 20000000],
//   ['V', 20000000],
//   ['W', 20000000],
//   ['X', 20000000],
//   ['Y', 20000000],
//   ['Z', 20000000],
//   ['AA', 20000000],
// ]

const tree = buildHuffmanTree(codes)
const huffmanCodes = buildHuffmanCode(tree)

console.log(huffmanCodes)

