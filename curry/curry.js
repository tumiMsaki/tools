/**
 *
 * @param {*} fn  需要curry化的函数
 * @param {*} len 原函数需要参数数量
 */
function curry(fn, len = fn.length) {
  return _curry.call(this, fn, len)
}

/**
 *
 * @param {*} fn 需要curry化的函数
 * @param {*} len 原函数需要的参数数量
 * @param  {...any} args 接收到的参数
 */
function _curry(fn, len, ...args) {
  return function(...params) {
    let _args = [...args, ...params]
    if (_args.length >= len) {
      return fn.apply(this, _args)
    } else {
      return _curry.call(this, fn, len, ..._args)
    }
  }
}

const _fn = curry((a, b, c, d) => {
  console.log(a, b, c, d)
})

_fn(1, 2)(3)(5)
