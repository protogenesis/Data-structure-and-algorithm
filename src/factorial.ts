function factorial(number: number) {
  if(number === 0) {
    return 1
  }

  let result = 1

  for(let i = 1; i <= number; i++) {
    result *= i
  }
  
}


factorial(4)

// O(n)
