function co(fn) {
  return new Promise((res, rej) => {
    function next(data) {
      let { value, done } = fn.next(data) 
      if (!done) {
        value.then(data => next(data), rej)
      } else {
        res(value)
      }
    }
    next()
  })
}

function* fn() {
  let a = yield Promise.resolve(1)
  let b = yield Promise.resolve(2)
  let c = yield Promise.resolve(3)
  return c
}

let bar = fn()

let aa = bar.next()
let bb = bar.next()
let cc = bar.next()
console.log(aa, bb, cc)

let bar2 = fn()

let nn = co(bar2)
nn.then(data => console.log(data))