/**
 * Author: Masaki
 */

/**
 * 冒泡排序
 * @param {number[]} arr
 * @returns {number[]}
 */
const bubbleSrot = arr => {
  if (arr.length <= 1) return arr

  for (let i = 0, len = arr.length; i < len; i++) {
    let hasChange = false
    for (let j = 0; j < len - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        const temp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = temp
        hasChange = true
      }
    }
    if (!hasChange) break
  }
  return arr
}

/**
 * 插入排序
 * @param {number[]} arr
 * @returns {number[]}
 */
const insertSort = arr => {
  if (arr.length <= 1) return arr

  for (let i = 0, len = arr.length; i < len; i++) {
    let temp = arr[i]
    let j = i - 1

    for (j; j >= 0; j--) {
      if (arr[j] > temp) {
        arr[j + 1] = arr[j]
      } else {
        break
      }
    }
    arr[j + 1] = temp
  }
  return arr
}

/**
 *  选择排序
 * @param {number[]} arr
 * @returns {number[]}
 */
const selectSort = arr => {
  if (arr.length <= 1) return arr

  for (let i = 0, len = arr.length; i < len - 1; i++) {
    let minIndex = i
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j
      }
    }
    let temp = arr[i]
    arr[i] = arr[minindex]
    arr[minIndex] = temp
  }
  return arr
}

/**
 * 归并排序
 * @param {number[]} arr
 * @returns {number[]}
 */
const mergeSort = arr => {
  if (arr.length <= 1) return arr
  const middle = Math.floor(arr.length / 2)
  const left = arr.slice(0, middle)
  const right = arr.slice(middle)
  return mergeArr(mergeSort(left), mergeSort(right))

  function mergeArr(left, right) {
    let temp = []
    while (left.length && right.length) {
      if (left[0] <= right[0]) {
        temp.push(left.shift())
      } else {
        temp.push(right.shift())
      }
    }

    while (left.length) {
      temp.push(left.shift())
    }

    while (right.length) {
      temp.push(right.shift())
    }
    return temp
  }
}

/**
 * 快速排序
 * @param {number[]} arr 
 * @returns {number[]}
 */
const quickSort = (arr, left, right) => {

  if (left < right) {
    let partitionIndex = partition(arr, left, right)
    quickSort(arr, left, partitionIndex - 1)
    quickSort(arr, partitionIndex + 1, right)
  }
  return arr
}

const swap = (arr, i, j) => {  
  [arr[j], arr[i]] = [arr[i], arr[j]]
}

const partition = (arr, left, right) => {
  let pivot = right
  let value = arr[pivot]
  while (left <= right) {
    while (arr[left] < value) {
      left++
    }
    while (arr[right] >= value) {
      right--
    }
    if (left >= right) {
      break
    }
    swap(arr, left, right)
    left++
    right--
  }
  let temp = arr[left]
  arr[left] = arr[pivot]
  arr[pivot] = temp
  return left
}


//测试
const testArr = []
let i = 0
while (i < 10) {
    testArr.push(Math.floor(Math.random() * 1000))
    i++
}
console.log('unsort', testArr)
quickSort(testArr, 0, testArr.length - 1);
console.log('sort', testArr)


