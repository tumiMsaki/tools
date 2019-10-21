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
function run(gen) {
  var g = gen()

  function next(data) {
    var result = g.next(data)

    if (result.done) return 

    result.value.then(data => {
      return data.json()
    }).then(data => {
      next(data)
    })
  }

  next()
}

/**
 * 
 * @param {*} gen 
 */
function run2(gen) {
  var g = gen2()

  function next(data) {
    var result = g.next(data)

    if (result.done) return 

    result.value(next)
  }

  next()
}
