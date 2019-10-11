Function.prototype.nCall = function(fn, ...args) {
  let context = fn || ( typeof window === "undefined" ? global : window ) 
  context.fn = this
  context.fn(...args) 
  delete context.fn
}

let foo = {
  value: 'yk'
}

value = 1

function bar(name, age) {
  console.log(name)
  console.log(age)
  console.log(this.value);
}

bar.nCall(foo)