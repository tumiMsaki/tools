Function.prototype.nCall = (context) => {
  context.fn = this
  let args = []
  for (let i = 1, len = arguments.length; i < len; i ++) {
    args.push(arguments[i])
  }
  context.fn(...args)
  let result = context(...args)
  delete context.fn
  return result
}

let foo = {
  value: "yk"
}

value = 1

function bar(name, age) {
  console.log(name)
  console.log(age)
  console.log(this.value)
}

bar.nCall(foo)
