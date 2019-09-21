import { POST } from '@utils/request'

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
export const action = async function(type, user, pwd) {
	if (type === 'login') {
		return await login(user, pwd)
	}
	return await register(user, pwd)
}
