function pipe(...fn) {
  return function(x) {
    return fn.reduce(function(arg, fn) {
      return fn(arg)
    }, x)
  }
}


function pipe(...fn) {
  return function(x) {
    return fn.reduceRight(function(arg, fn) {
      return fn(arg)
    }, x)
  }
}