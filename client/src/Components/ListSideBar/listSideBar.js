import { uniqBy } from 'lodash'
import Icon from '@/Components/Icon'
import Loading from '@utils/loading'
import IconModal from '../IconModal'
import { get, random } from '@utils/index.js'
import { getMenu, addMenu, delMenu } from './interface'
import { Menu, MenuItem, MenuItemGroup, Submenu, Message, MessageBox } from 'element-ui'

export default {
	data() {
		return {
			open: false,
			menuList: [],
			height: null,
			active: '1',
			classId: random(),
			visible: false,
		}
	},
	props: ['EventEmitter', 'title'],
	components: { Menu, MenuItem, MenuItemGroup, Submenu, Icon, IconModal },
	mounted() {
		this.reloadList()
		this.EventEmitter.emit('menuChange', this.menuList[0])
		document.body.addEventListener('click', this.closePop)
	},
	updated () {
    const el = this.$el
    const height = get(el, 'offsetHeight', null)
    this.EventEmitter.emit('sideBarHeightChange', height)
    console.log('刷新dom', el)
  },
	methods: {
		async reloadList() {
			Loading.open()
			let extraList = await getMenu()
			Loading.close()
			this.menuList = uniqBy(extraList, 'id')
		},
		collapse() {
			this.open = !this.open
		},
		closePop(event) {
			let path = event.path || (event.composedPath && event.composedPath())
			const isCurrent = [...path].some(dom => {
				const classList = get(dom, 'classList', null)
				if (classList) {
					return ['el-dialog', this.classId].some(item => dom.classList.contains(item))
				}
				return false
			})
			if (!isCurrent) {
				this.open = false
			}
		},
		onSelect(index, indexPath) {
			this.active = index
			const pathList = indexPath.map(path => `[${path - 1}]`)
			const target = get(this.menuList, pathList.join('.'), {})
			this.EventEmitter.emit('menuChange', target)
		},
		async add() {
			if (!this.open) return
			this.visible = true
		},
		async ok(title, icon) {
			const data = {
				name: title,
				type: 'custom',
				icon,
			}
			Loading.open()
			await addMenu(data)
			this.reloadList()
		},
		delMenu(id, name) {
			MessageBox.confirm(`是否删除 ${name} 清单？`, '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'error',
			}).then(async () => {
				Loading.open()
				await delMenu(id)
				await this.reloadList()
				Message.success('删除成功')
				this.EventEmitter.emit('menuChange', this.menuList[0])
			})
		},
	},
}
