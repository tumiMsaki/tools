/**
 * 
 * @param {Array} arr 
 * @param {number} target 
 * @returns {number}
 */
const binarySearch = (arr, target) => {
  let max = arr.length - 1
  let min = 0
  while (min <= max) {
    let min = Math.floor((max + min) / 2)
    if (target < arr[min]) {
      max = min - 1
    } else if (target > arr[min]){
      min = max - 1
    } else {
      return min
    }
  }
  return -1
}