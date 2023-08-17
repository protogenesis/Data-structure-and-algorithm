function cartesianProduct(arr1: number[], arr2: number[]): string[] {
  const resultArr: string[] = []

  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr2.length; j++) {
      const item = `${arr1[i]}${arr2[j]}`
      if (!resultArr.includes(item)) {
        resultArr.push(item)
      }
    }
  }
  console.log(resultArr)
  return resultArr
}

const arr1 = [1, 2, 0]
const arr2 = [3, 4, 5, 1, 0]

cartesianProduct(arr1, arr2)

// O(n1n2)
