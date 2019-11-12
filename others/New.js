const nNew = function(fn, ...args) {
  let obj = {}
  obj.__proto__ = fn.prototype
  // Object.setPrototypeOf(obj, fn.prototype)
  let result = fn.apply(obj, args)
  return result instanceof Object ? result : obj
}

function K(name, age) {
  this.name = name
  this.age = age
}

K.prototype.say = function() {
  return `my name is ${this.name}, and I'm ${this.age} years old`
}

const k = nNew(K, "masaki", 20)
console.log(k.name)
console.log(k.age)
console.log(k.say())
