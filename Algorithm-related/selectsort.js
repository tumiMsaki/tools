const selectSrot = (arr) => {
  let index
  for(let i = 0, len = arr.length; i < len; i++) {
    for( let j = i + 1; j < len; j++) {
      index = i
      if (arr[index] > arr[j]) {
        index = j
      }
    }
    if (index != i) {
      let temp = arr[index]
      arr[index] = arr[i]
      arr[i] = temp
      console.log(arr)
    }
  }
  return arr
}

console.log(selectSrot([4,2,6,1]))