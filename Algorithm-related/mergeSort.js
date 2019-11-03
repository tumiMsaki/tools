function mergeSort(unsorted) {
  function merge(leftArr, rightArr) {
    const lenL = leftArr.length;
    const lenR = rightArr.length;
    let indexL = 0;
    let indexR = 0;
    const result = [];

    while (indexL < lenL && indexR < lenR) {
      if (leftArr[indexL] < rightArr[indexR]) {
        result.push(leftArr[indexL++]);
      } else {
        result.push(rightArr[indexR++]);
      }
    }

    while (indexL < lenL) {
      result.push(leftArr[indexL++]);
    }

    while (indexR < lenR) {
      result.push(rightArr[indexR++]);
    }

    return result;
  }

  function split(array) {
    const len = array.length;

    if (len <= 1) {
      return array;
    }

    const mid = Math.floor(len / 2);

    const leftArr = array.slice(0, mid);
    const rightArr = array.slice(mid, len);

    return merge( split(leftArr), split(rightArr) );
  }

  return split(unsorted);
}

show(mergeSort);
