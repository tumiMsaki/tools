Function.prototype.nApply = function(fn, arr) {
  let context = fn || (typeof window === "undefined" ? global : window)
  context.fn = this
  arr ? context.fn(...arr) : context.fn()
  delete context.fn
}

let foo = {
  value: "yk"
}

var value = 1

function bar(name, age) {
  console.log(name)
  console.log(age)
  console.log(this.value)
}

bar.nApply(foo)
