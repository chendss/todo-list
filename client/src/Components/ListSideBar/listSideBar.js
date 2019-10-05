import { uniqBy } from 'lodash'
import Icon from '@/Components/Icon'
import Loading from '@utils/loading'
import { get } from '@utils/index.js'
import { getMenu, addMenu } from './interface'
import { Menu, MenuItem, MenuItemGroup, Submenu, MessageBox } from 'element-ui'

export default {
	data() {
		return {
			open: true,
			menuList: [],
			height: null,
		}
	},
	props: ['EventEmitter', 'title'],
	components: { Menu, MenuItem, MenuItemGroup, Submenu, Icon },
	mounted() {
		this.reloadList()
		this.EventEmitter.addListener('heightChange', height => {
			this.height = height
		})
	},
	methods: {
		async reloadList() {
			Loading.open()
			let extraList = await getMenu()
			Loading.close()
			let menuList = this.menuList.concat(extraList)
			this.menuList = uniqBy(menuList, 'id')
		},
		collapse() {
			this.open = !this.open
		},
		onSelect(index, indexPath) {
			const pathList = indexPath.map(path => `[${path - 1}]`)
			const target = get(this.menuList, pathList.join('.'), {})
			this.EventEmitter.emit('menuChange', target)
		},
		async add() {
			if (!this.open) return
			let res = await MessageBox.prompt('请输入清单名称', '新增清单', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
			})
			const { value } = res
			const data = {
				name: value,
				type: 'custom',
			}
			Loading.open()
			await addMenu(data)
			this.reloadList()
		},
	},
}
