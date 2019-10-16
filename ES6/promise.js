/**
 * Promise/A+规范模仿Promise过程
 * @param {*} executor 传入将要执行的函数
 */

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

/**
 * onFulfilled返回一个普通的值，成功时直接等于 value => value
 * onRejected返回一个普通的值，失败时如果直接等于 value => value，则会跑到下一个then中的onFulfilled中，所以直接扔出一个错误reason => throw err
 * onFulfilled或onRejected不能同步被调用，必须异步调用。我们就用setTimeout解决异步问题
 * 如果onFulfilled或onRejected报错，则直接返回reject()
 */

nPromise.prototype.then = function(onFulfilled, onRejected) {
  let promise2 = new nPromise((res, rej) => {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
    onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err }

    if (this.state === 'pending') {
      this.onFulfilledFnnc.push(() => {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (err) {
            reject(err)
          }
        })
      })

      this.onRejectedFunc.push(() => {
        setTimeout(() => {
          try {
            let x = onRejected(this.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (err) {
            reject(err)
          }
        })
      })
    }

    if (this.state === 'fulfilled') {
      setTimeout(() => {
        try {
          let x = onFulfilled(this.value)
          resolvePromise(promise2, x, resolve, reject)
        } catch (err) {
          reject(err)
        }
      })
    }

    if (this.state === 'rejected') {
      setTimeout(() => {
        try {
          let x = onRejected(this.reason)
          resolvePromise(promise2, x, resolve, reject)
        } catch (err) {
          reject(err)
        }
      })
    }
  })

  return promise2
}

/**
 * Promise.all
 */
nPromise.prototype.all = function(promises) {
  return new nPromise((res, rej) => {
    let index = 0
    let result = []
    if (promises.length === 0) {
      res(result)
    } else {
      function processValue(i, data) {
        result[i] = data
        if (++index === promises.length) {
          res(result)
        }
      }

      for (let i = 0; i < promises.length; i++) {
        nPromise.resolve(promises[i]).then((data) => {
          processValue(i, data)
        },(err) => {
          reject(err)
          return 
        })
      }
    }
  })
}

/**
 * 解析新的then和返回的Promise对象
 * @param {*} promise2 返回的新Promise对象
 * @param {*} x then的返回值
 * @param {*} resolve Promise2的resolve
 * @param {*} reject Promise2的reject
 */

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    reject(new TypeError('promise reference itself'))
  }
  let called
  if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    try {
      let then = x.then
      if (typeof then === 'function') {
        then.call(x, (y) => {
          if (called) return
          called = true
          resolvePromise(promise2, y, resolve, reject)
        }, (r) => {
          if (called) return
          called = true
          reject(r)
        })
      } else {
        resolve(x)
      }
    } catch (err) {
      if (called) return
      called = true
      reject(err)
    }
  } else {
    resolve(x)
  }
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
