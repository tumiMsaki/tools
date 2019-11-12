const Qsort = arr => {
  if (arr.length < 2) {
    return arr
  }
  let pivot = arr[0]
  let rigthArr = []
  let leftArr = []

  for (let i = 1, len = arr.length; i < len; i++) {
    if (arr[i] < pivot) {
      rigthArr.push(arr[i])
    } else {
      leftArr.push(arr[i])
    }
  }

  return [...Qsort(rigthArr), pivot, ...Qsort(leftArr)]
}

console.log(Qsort([1, 2, 3, 4, 5, 6, 7]))
