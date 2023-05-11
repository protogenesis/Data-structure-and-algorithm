function quickSort(arr) {
  const pivot = arr.at(-1)

  let left = []
  let right = []

  for (let i = 0; i < arr.length - 1; i++) {
    const item = arr[i]
    if (item > pivot) {
      right.push(item)
    } else {
      left.push(item)
    }
  }

  if (left.length > 1) {
    const res = quickSort(left)
    left = res
  }
  
  if (right.length > 1) {
    const res = quickSort(right)
    right = res
  }

  const result = [...left, pivot, ...right]
  return result

}
console.log(quickSort([2, -6, 1, 0, 4, 99, -24, -444, 1,99,23,-5]))

// quickSort([-6,20,2,-2,8])

// O(nlog(n))