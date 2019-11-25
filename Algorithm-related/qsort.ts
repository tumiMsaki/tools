const quickSort = function() {
  function compare(a: number, b:number) {
    if (a === b) return 0
    return a > b ? 1 : -1
  }

  function swap(arr: number[], a:number, b:number) {
    [arr[a], arr[b]] = [arr[b], arr[a]]
  }

  function partition(arr:number[], left:number, right:number) {
    let pivot = arr[Math.floor((left + right) / 2)]
    let i = left
    let j = right
    while (i <= j) {
      while (compare(arr[j], pivot) === 1) {
        j--
      }
      while (compare(arr[i], pivot) === -1) {
        i++
      }
      if (i <= j) {
        swap(arr, i, j)
        i++
        j--
      }
    }
    return i
  }

  function sort(arr:number[], left:number, right:number) {
    let index: number
    if (arr.length > 1) {
      index = partition(arr, left, right)
      if (index > left) {
        sort(arr, left, index - 1)
      }
      if (index < right) {
        sort(arr, index, right)
      }
    }
    return arr
  }

  return function quickSort(arr:number[]) {
    return sort(arr, 0, arr.length - 1)
  }
}

const arr = [2, 4, 1, 49, 24, 69]
const a = quickSort()
console.log(a(arr))
