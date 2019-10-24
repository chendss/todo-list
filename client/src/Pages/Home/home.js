import { DB, get } from '@utils/index.js'

export default {
	data() {
		return {}
	},
	created() {
		const store = DB.get('userInfo')
		if (get(store, 'username', null)) {
			this.$router.push('/list/')
		}
	},
	methods: {
		register() {
			this.$router.push('/userInfo/register')
		},
		login() {
			this.$router.push('/userInfo/login')
		},
	},
}
