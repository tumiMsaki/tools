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

const flatten2 = (arr) => {
  let result = []
  while(arr.some(item => Array.isArray(arr[item]))){
    result = [].concat(...arr)
  }
  return result
}

