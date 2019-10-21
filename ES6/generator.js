const url = 'https://api.github.com/users/github'

function* gen() {
  let r1 = yield fetch(url)
  let r2 = yield fetch(url)
  let r3 = yield fetch(url)
  console.log(r1,r2,r3)
}


/**
 * 
 */
function fetchData() {
  return function(cb) {
    setTimeout(() => {
      cb(url)
    }, 1000);
  }
}

function* gen2() {
  let r1 = yield fetchData(url)
  let r2 = yield fetchData(url)
  let r3 = yield fetchData(url)
  console.log(r1, r2, r3)
}


/**
 * 
 */

var g = gen()

var result = g.next()

result.value.then(data => {
  return data.json()
}).then(data => {
  return g.next().value
}).then(data => {
  return data.json()
}).then(data => {
  return g.next().value
})


/**
 * 
 * @param {*} gen 
 */
// function run(gen) {
//   var g = gen()

//   function next(data) {
//     var result = g.next(data)

//     if (result.done) return 

//     result.value.then(data => {
//       return data.json()
//     }).then(data => {
//       next(data)
//     })
//   }

//   next()
// }

/**
 * 
 * @param {*} gen 
 */
// function run2(gen) {
//   var g = gen2()

//   function next(data) {
//     var result = g.next(data)

//     if (result.done) return 

//     result.value(next)
//   }

//   next()
// }


function run(gen) {
  var g = gen()

  return new Promise((res, rej) => {
    function next(data) {
      try {
        var result = g.next(data)
      } catch(err) {
        rej(err)
      }

      if (result.done) {
        return res(result.value)
      }

      var value = toPromise(result.value)

      value.then(data => {
        next(data)
      }, err => rej(err))  
    }

    next()
  })
}

function isPromise(obj) {
  return 'function' === typeof obj.then
}

function toPromise(obj) {
  if (isPromise(obj)) return obj

  if('function' === typeof obj) {
    return thunkToPromise(obj)
  }

  return obj
}

function thunkToPromise(fn) {
  return new Promise((res, rej) => {
    fn((err, result) => {
      if (err) return rej(err)
      res(result)
    })
  })
}
