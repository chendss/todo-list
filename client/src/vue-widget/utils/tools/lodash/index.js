import { get as lodashGet, mergeWith } from 'lodash'

/**
 * 加强的 get 函数 解决null也正常返回
 *
 * @param {*} source
 * @param {*} path
 * @param {*} defaultValue
 * @returns
 */
export const get = function(source, path, defaultValue) {
	const result = lodashGet(source, path, defaultValue)
	if ([undefined, null, ''].includes(result)) {
		return defaultValue
	}
	return result
}

/**
 * 合并对象， 为假值的将被覆盖
 *
 * @returns object
 */
export const merge = function() {
	return mergeWith(...arguments, (obj, source) => {
		if ([obj, source].some(item => [null, undefined].includes(item))) {
			return obj || source
		}
	})
}

export default {
	get,
	merge,
}
