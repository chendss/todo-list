export default {
	data() {
		return {}
	},
	created() {},
	methods: {
		register() {
			this.$router.push('/userInfo/register')
		},
		login() {
			this.$router.push('/userInfo/login')
		},
	},
}
