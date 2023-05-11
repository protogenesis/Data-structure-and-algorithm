function bubbleSort(arr) {
  for(let i = 0; i < arr.length; i++) {
    for(let j = i + 1; j < arr.length; j++) {
      if(arr[i] > arr[j]) {
        const temp = arr[i]
        arr[i] = arr[j]
        arr[j] = temp
      }
    }
  }
  console.log(arr)
  return arr
}

bubbleSort([-6, 20, 8, -2, 4])

// Big O = O(n^2)