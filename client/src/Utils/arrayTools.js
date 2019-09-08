import { typeZh } from './objectTools'

/**
 * 将任意参数变成数组
 *
 * @param {*} val
 * @returns {Array<any>}
 */
export const castArray = function(val) {
	if (typeZh(val) === '数组') {
		return val
	} else {
		return [val]
	}
}

/**
 * 获取array数组的第n个元素。如果n为负数，则返回从数组结尾开始的第n个元素。
 *
 * @param {Array<any>} array
 * @param {number} [n=0]
 */
export const nth = function(array, n = 0) {
	let length = array.length
	if (n >= 0) {
		return array[n]
	} else {
		let n_ = length - Math.abs(n)
		return array[n_]
	}
}
