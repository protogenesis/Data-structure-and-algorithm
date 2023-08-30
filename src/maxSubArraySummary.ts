export default function maxSubArraySummary(array: number[]) {
  let maxSofar = array[0]
  let maxEndingHere = array[0]

  for (let i = 0; i < array.length; i++) {
    maxEndingHere = Math.max(array[i], maxEndingHere + array[i])
    maxSofar = Math.max(maxEndingHere, maxSofar)
  }

  return maxSofar
}