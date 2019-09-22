import { Menu, MenuItem, MenuItemGroup, Submenu } from 'element-ui'

export default {
	components: { Menu, MenuItem, MenuItemGroup, Submenu },
	methods: {
		handleOpen(key, keyPath) {
			console.log(key, keyPath)
		},
		handleClose(key, keyPath) {
			console.log(key, keyPath)
		},
	},
}
