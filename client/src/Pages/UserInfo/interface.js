import { POST } from '@utils/request'

export const login = async (user, pwd) => {
	return await POST('/login', { user, pwd })
}

export const register = async (user, pwd) => {
	return await POST('/register', { user, pwd })
}
