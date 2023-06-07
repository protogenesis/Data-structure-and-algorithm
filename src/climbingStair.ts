function climbingStair(n: number): number {
  // n > >= 0
  if (n <= 3) {
    return n
  }

  return climbingStair(n - 2) + climbingStair(n - 1)

  // or just using for loop.
}
console.log(climbingStair(4))

// 4: 1111,121,112,211,22

// O(n^3)
