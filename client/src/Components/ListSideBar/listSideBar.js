import { Menu, MenuItem, MenuItemGroup, Submenu } from 'element-ui'
import Icon from '@/Components/Icon'

export default {
	data() {
		return {
			open: true,
		}
	},
	components: { Menu, MenuItem, MenuItemGroup, Submenu, Icon },
	methods: {
		handleOpen(key, keyPath) {
			console.log(key, keyPath)
		},
		handleClose(key, keyPath) {
			console.log(key, keyPath)
		},
		collapse() {
			this.open = !this.open
		},
	},
}
