/**
 * 浅克隆
 * @param {*} o
 */
const shallowClone = o => {
  const obj = {}
  for (let i in o) {
    obj[i] = o[i]
  }
  return obj
}
/**
 *
 * @param {*} obj
 * @param {*} type
 */
const isType = (obj, type) => {
  if (typeof obj !== "object") return false
  const typeString = Object.prototype.toString.call(obj)
  let flag
  switch (type) {
    case "Array":
      flag = typeString === "[object Array]"
      break
    case "Date":
      flag = typeString === "[object Date]"
      break
    case "RegExp":
      flag = typeString === "[object RegExp]"
      break
    default:
      flag = false
  }
  return flag
}
/**
 *
 * @param {*} re
 */
const getRegExp = re => {
  let flag = ""
  if (re.global) flag += "g"
  if (re.ignoreCase) flag += "i"
  if (re.multiline) flag += "m"
  return flag
}

/**
 * deep clone
 * @param  {[type]} parent object 需要进行克隆的对象
 * @return {[type]}        深克隆后的对象
 */
const deepClone = parent => {
  const parents = []
  const children = []

  const _clone = parent => {
    if (parent === null) return null
    if (typeof parent !== "object") return parent

    let child, proto

    if (isType(parent, "Array")) {
      child = []
    } else if (isType(parent, "Date")) {
      child = new Date(parent.getTime())
    } else if (isType(parent, "RegExp")) {
      child = new RegExp(parent.source, getRegExp(parent))
      if (parent.lastIndex) child.lastIndex = parent.lastIndex
    } else {
      proto = Object.getPrototypeOf(parent)
      child = Object.create(proto)
    }
    parents.push(parent)
    children.push(child)

    for (let i in parent) {
      child[i] = _clone(parent[i])
    }

    return child
  }

  return _clone(parent)
}
