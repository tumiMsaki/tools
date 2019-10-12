const flatten = (arr) => {
  let result = []
  for(let i = 0, len = arr.length; i < len; i++) {
    if(Array.isArray(arr[i])) {
      result = result.concat(flatten(arr[i]))
    }else{
      result.push(arr[i])
    }
  }
  return result
}


let arr = flatten([1,2,[3,4,[5,6]]])
console.log(arr)
