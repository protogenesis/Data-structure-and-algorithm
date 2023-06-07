function recursiveBinarySearch(arr: number[], target: number) {
  let left = 0,
    right = arr.length - 1
  function recursion(left: number, right: number): number {
    if (left > right) {
      return -1
    }

    const middle = Math.floor((left + right) / 2)
    if (target === arr[middle]) {
      return middle
    } else if (target > arr[middle]) {
      left = middle + 1
    } else {
      right = middle - 1
    }

    return recursion(left, right)
  }
  return recursion(left, right)
}

console.log(recursiveBinarySearch([-5, 2, 4, 6, 10], 2))

// O(log(n))
