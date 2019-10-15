function nPromise(executor) {
  this.state = 'pending'
  this.value = undefined
  this.reason = undefined
  this.onFulfilledFnnc = []
  this.onRejectedFunc = []
  resolve = (value) => {
    if (this.state === 'pending') {
      this.state = 'fulfilled'
      this.value = value
      this.onFulfilledFnnc.forEach(fn => fn(value))
    }
  }

  reject = (reason) => {
    if (this.state === 'pending') {
      this.state = 'rejected'
      this.reason = reason
      this.onRejectedFunc.forEach(fn => fn(value))
    }
  }
  
  try {
    executor(resolve, reject)
  } catch (err) {
    reject(err)
  }
}

nPromise.prototype.then = function(onFulfilled, onRejected) {
  if (this.state === 'pending') {
    if (typeof onFulfilled === 'function') {
      this.onFulfilledFnnc.push(onFulfilled)
    }
    if (typeof onRejected === 'function') {
      this.onRejectedFunc.push(onRejected)
    }
  }
  if (this.state === 'fulfilled') {
    if (typeof onFulfilled === 'function') {
      onFulfilled(this.value)
    }
  }

  if (this.state === 'rejected') {
    if (typeof onRejected === 'function') {
      onRejected(this.reason)
    }
  }
}

function resolvePromise(promise2, x, resolve, reject) {

}


const foo = new nPromise((res, rej) => {
  res('data')
})

// foo.then(res => {
//   console.log(res)
// })

// console.log(foo)


const bar = new Promise((res, rej) => {
  res(console.log('do it'))
})


// console.log(bar)
