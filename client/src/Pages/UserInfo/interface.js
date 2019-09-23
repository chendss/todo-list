import { POST } from '@utils/request'
import DB from '@utils/DB'

export const login = async (user, pwd) => {
  return await POST('/login', { user, pwd })
}

export const register = async (user, pwd) => {
  return await POST('/register', { user, pwd })
}

/**
 * 直接请求
 *
 * @param {*} type
 * @param {*} user
 * @param {*} pwd
 * @returns
 */
export const action = async function (type, user, pwd) {
  let res = null
  if (type === 'login') {
    res = await login(user, pwd)
  } else {
    res = await register(user, pwd)
  }
  DB.set('token', { token: res })
  return res
}
