/**
 * 判断元素的正确类型
 *
 * @param {*} obj
 * @returns {string}
 */
export const type = function(obj) {
	let result = Object.prototype.toString.call(obj)
	result = result.substring(8, result.length - 1)
	if (isNaN(obj)) {
		return 'NaN'
	} else {
		return result
	}
}
/**
 * 判断元素的正确类型(返回中文)
 *
 * @param {*} obj
 * @returns {string}
 */
export const typeZh = function(obj) {
	const outDict = {
		Number: '数字',
		Undefined: '未定义',
		Object: '对象',
		Array: '数组',
		String: '字符串',
		Null: '空值',
		NaN: 'NaN',
		Function: '函数',
		Date: '时间',
	}
	let typeStr = outDict[type(obj)]
	return typeStr
}
