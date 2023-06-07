function primeNumber(number: number) {
  if (number < 2) {
    return false
  }

  for (let i = 2; i <= Math.sqrt(number); i++) {
    if (number % i === 0) {
      console.log(i)
      return false
    }
  }

  return true
}

// console.log(primeNumber(1))
// console.log(primeNumber(2))
// console.log(primeNumber(3))
// console.log(primeNumber(5))
console.log(primeNumber(9))
console.log(primeNumber(13))

// O(log(n))