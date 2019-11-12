Function.prototype.nBind = function(fn, ...args) {
  let self = this
  result = function() {
    self.apply(this instanceof self ? this : fn, [...args].concat([...args]))
  }
  result.prototype = this.prototype
  return result
}

var foo = {
  value: 1
}

function K(name, age) {
  console.log(name)
  console.log(this.value)
}

var k = K.nBind(foo, "yk")

var kk = new k(12)
