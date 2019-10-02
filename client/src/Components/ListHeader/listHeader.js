import Icon from '@/Components/Icon'
import { Input, Message, Dropdown, DropdownItem, DropdownMenu } from 'element-ui'
import { updateToken } from '@/Utils/request'
import avatar from '@/assets/img/头像.jpg'
import { DB } from '@utils/index'

const Msg = Message

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
		async dropCommand(command) {
			if (command === 'update') {
				await updateToken()
				Msg.success('更新token成功')
			} else if (command === 'out') {
				this.$router.push('/')
			}
		},
	},
	computed: {
		imgSrc() {
			return this.avatar || avatar
		},
	},
	props: ['avatar', 'name'],
	components: { Icon, EleInput: Input, Dropdown, DropdownItem, DropdownMenu },
}
