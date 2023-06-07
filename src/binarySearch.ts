function binarySearch(arr: number[], target: number) {
  let start = 0, end = arr.length - 1;
  
  while (start <= end) {
    const middleIndex = Math.floor((start + end) / 2)
    if(target === arr[middleIndex]) {
      return middleIndex
    }else if(target > arr[middleIndex]) {
        start = middleIndex + 1
    }else {
      end = middleIndex - 1
    }
  }
  return -1
}

console.log(binarySearch([-4,1,5,6,7], 1))

// O(log(n))