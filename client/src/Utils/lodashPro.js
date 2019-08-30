import { get as lodashGet, mergeWith } from 'lodash'

/**
* 将一个元素转换成数组
*
* @param {*} obj
* @returns
*/
export const toArray = function (obj) {
  if (obj instanceof Array) {
    return obj
  }
  return [obj].filter(item => item != null)
}

/**
 * 加强的 get 函数 解决null也正常返回
 *
 * @param {object} source
 * @param {string|Array} path
 * @param {*} defaultValue
 * @returns
 */
export const get = function (source, path, defaultValue) {
  const pathList = toArray(path)
  for (let p of pathList) {
    const value = lodashGet(source, p, null)
    if (value != null) {
      return value
    }
  }
  return defaultValue
}

/**
 * 合并对象， 为假值的将被覆盖
 *
 * @returns object
 */
export const merge = function () {
  return mergeWith(...arguments, (obj, source) => {
    if ([obj, source].some(item => [null, undefined].includes(item))) {
      return obj || source
    }
  })
}