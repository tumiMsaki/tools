function pipe(...fn) {
  return function(x) {
    return fn.reduce(function(arg, fn) {
      return fn(arg)
    }, x)
  }
}