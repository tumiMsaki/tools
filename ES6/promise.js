function nPromise(executor) {
  this.state = 'pending'
  this.value = undefined
  this.reason = undefined
  resolve = (value) => {
    if (this.state === 'pending') {
      this.state = 'fulfilled'
      this.value = value
    }
  }

  reject = (reason) => {
    if (this.state === 'pending') {
      this.state = 'rejected'
      this.reason = reason
    }
  }
  
  try {
    executor(resolve, reject)
  } catch (err) {
    reject(err)
  }
}

nPromise.prototype.then = function(onFulfilled, onRejected) {
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


const foo = new nPromise((res, rej) => {
  res('data')
})

foo.then(res => {
  console.log(res)
})

