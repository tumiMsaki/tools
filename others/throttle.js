function throttle(method, wait, type) {
  if (type === 1) {
    let previous = 0
  } else if (type === 2) {
    let timeout
  }
  let throttle = function(...args) {
    return new Promise(resolve => {
      let context = this
      if (type === 1) {
        let now = Date.now()
        if (now - previous > wait) {
          let result = method.apply(context, args)
          previous = now
          resolve(result)
        }
      } else if (type === 2) {
        if (!timeout) {
          timeout = setTimeout(() => {
            timeout = null
            let result = method.apply(context, args)
            resolve(result)
          }, wait)
        }
      }
    })
  }
  return throttle
}
