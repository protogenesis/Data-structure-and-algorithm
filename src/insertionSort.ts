function insertionSort(arr: number[]) { 
  for (let index = 1; index < arr.length; index++) {
    const numberToSort = arr[index]
    
    for (let j = index - 1; j >= 0; j--) {
        if(arr[j] > numberToSort) {
          arr[j + 1] = arr[j]
          if(j === 0) {
            arr[j] = numberToSort
          }
        }else{
          arr[j + 1] = numberToSort
          break
        }
    }
  }
  console.log(arr)
}
// insertionSort([200, -1, 2])

// insertionSort([200,-500, -342,-234,-234,234,-234,5,-2,-55,-542,-5666,999, -1, 0, -2,-6, 20, 8,])

insertionSort([-400,-300,99,100])

// O(n^2)