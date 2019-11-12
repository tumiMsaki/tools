function forOf(obj, cb) {
  let iterable, result
  if (typeof obj[Symbol.iterator] !== "function")
    throw new TypeError(result + "is not iterable")
  if (typeof cb !== "function") throw new TypeError("cb must be calleble")

  iterable = obj[Symbol.iterator]()
  result = iterable.next()
  while (!result.done) {
    cb(result.value)
    result = iterable.next()
  }
}

let colors = ["red", "green", "blue"]

forOf(colors, res => console.log(res))
