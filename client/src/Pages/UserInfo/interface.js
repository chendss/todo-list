import { POST } from '@utils/request'

export const login = async () => {
	await POST('/login', { test: 1 })
}
