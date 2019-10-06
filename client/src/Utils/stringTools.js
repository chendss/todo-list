/**
 * 生成随机数
 *
 * @param {number} [n=32]
 * @returns
 */
export const random = function (n = 64) {
  let chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
  let letter = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz'
  let maxPos = chars.length
  let result = ''
  for (let i = 0; i < n; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos))
  }
  result = letter.charAt(Math.floor(Math.random() * letter.length)) + result
  return result.substring(0, result.length - 1)
}