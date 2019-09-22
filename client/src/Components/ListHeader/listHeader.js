import Icon from '@/Components/Icon'
import { Input } from 'element-ui'
import avatar from '@/assets/img/头像.jpg'

export default {
	data() {
		return {
			searchText: '',
		}
	},
	methods: {
		searchChange(val) {
			this.$emit('change', val)
		},
	},
	computed: {
		imgSrc() {
			return this.avatar || avatar
		},
	},
	props: ['avatar', 'name'],
	components: { Icon, EleInput: Input },
}
