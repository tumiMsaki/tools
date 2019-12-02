/**
 * 
 * @param {*} arr 
 * @param {*} target 
 */
const linearSearch = (arr, target) => {
	for (let i = 0; i < arr.length; i++) {
		if (arr[i] === target) {
			return i
		}
	}
	return -1
}