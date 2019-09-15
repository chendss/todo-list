import { get } from '@utils/index'
import { POST } from '@utils/request'

export default {
	data() {
		return {
			type: 'register',
			text: '',
			user: '',
			pwd: '',
			confirmPwd: '',
		}
	},
	created() {
		this.type = get(this, '$route.params.type', 'register')
		this.text = this.type === 'register' ? '注册' : '登录'
	},
	methods: {
		async action() {
			await POST('/login', { test: 1 })
		},
	},
}
