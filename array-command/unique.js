const unique = (arr) => {
  result = []
  for(var i = 0, len = arr.length; i < len; i++){
    for(var j = 0, resLen = result.length; j < resLen; j++){
      if(arr[i] === result[j]){
        break
      }
    }
    if(j === resLen){
      result.push(arr[i])
    }
  }
  return result
}

//ES6

const unique_ES6 = (a) => [...new Set(a)]

const test_arr = unique([1,1,1,2,2,3])
const test_ES6 = unique_ES6([1,1,1,2,2,3])
console.log(test_arr,test_ES6)