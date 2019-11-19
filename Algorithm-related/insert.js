function insert(list = []) {
  console.time()
  for (let i = 1, len = list.length; i < len; i++) {
    let j = i - 1
    let current = list[i]
    while (j >= 0 && list[j] > current) {
      list[j + 1] = list[j]
      j--
    }
    list[j + 1] = current
  }
  return list
}

console.log(insert([2, 3, 5, 1, 7, 8, 4, 5]))
