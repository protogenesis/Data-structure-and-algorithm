function mergeSort(arr: number[]): number[] {
  if(arr.length < 2) {
    return arr
  }

  const middle = Math.floor(arr.length / 2)

  const left = arr.slice(0,middle)
  const right = arr.slice(middle)
  
  const sortedLeft = mergeSort(left)
  const sortedRight = mergeSort(right)

  return merge(sortedLeft, sortedRight)
}

function merge(leftArr: number[], rightArr: number[]): number[] {
  const sortedArr: number[] = []

  while(leftArr.length && rightArr.length) {
     if(leftArr[0] > rightArr[0]) {
       sortedArr.push(rightArr.shift() as number)
     }else {
       sortedArr.push(leftArr.shift() as number)
     }
  }

  const result = [...sortedArr, ...leftArr, ...rightArr]
  return result
}

// console.log(mergeSort([-6, 20, -2, 4, 8]))
console.log(mergeSort([3, 2, 1]))

// O(nlog(n))