import { get } from '@utils/index'
import Icon from '@widget/Icon/index.vue'
import { Message, Form, FormItem, Input, Button } from 'element-ui'

const message = Message

export default {
	components: { Form, FormItem, ElementInput: Input, Button, Icon },
	data() {
		return {
			param: {
				username: 'admin',
				password: '123123',
				confirmPassword: '',
			},
			rules: {
				username: [{ required: true, message: '请输入用户名', trigger: 'change' }],
				password: [{ required: true, message: '请输入密码', trigger: 'change' }],
				confirmPassword: [{ validator: this.confirmPwdValidator, trigger: 'change' }],
			},
			type: '',
		}
	},
	mounted() {
		const type = get(this, '$route.params.type', 'login')
		if (type === 'login') {
			this.type = 'login'
		} else {
			this.type = 'register'
		}
	},
	methods: {
		confirmPwdValidator(rule, value, callback) {
			if (value === '') {
				callback(new Error('请再次输入密码'))
			} else if (value !== this.param.password) {
				callback(new Error('两次输入密码不一致!'))
			} else {
				callback()
			}
		},
		submitForm() {
			const msg = get(this, 'type', 'login') === 'login' ? '登录成功' : '注册成功'
			this.$refs.user.validate(valid => {
				if (valid) {
					message.success(msg)
				}
			})
		},
	},
}
