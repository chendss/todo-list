import { Message, Form, FormItem, Input, Button } from 'element-ui'
import Icon from '@widget/Icon/index.vue'

export default {
	components: { Form, FormItem, ElementInput: Input, Button, Icon },
	data: function() {
		return {
			param: {
				username: 'admin',
				password: '123123',
			},
			rules: {
				username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
				password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
			},
		}
	},
	methods: {
		submitForm() {
			this.$refs.login.validate(valid => {
				if (valid) {
					Message.success('登录成功')
				} else {
					Message.error('请输入账号和密码')
					return false
				}
			})
		},
	},
}
