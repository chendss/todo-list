import { uniqBy } from 'lodash'
import { DB } from '@utils/index'
import Icon from '@/Components/Icon'
import Loading from '@utils/loading'
import IconModal from '../IconModal'
import { get, random, merge } from '@utils/index.js'
import { getMenu, addMenu, delMenu } from './interface'
import { Menu, MenuItem, MenuItemGroup, Submenu, Message, MessageBox } from 'element-ui'

export default {
	data() {
		const localSideBar = DB.get('sideBar') || {}
		return {
			height: null,
			visible: false,
			classId: random(),
			open: get(localSideBar, 'open', true),
			targetId: get(localSideBar, 'id', null),
			active: get(localSideBar, 'active', '1'),
			menuList: get(localSideBar, 'menuList', []),
		}
	},
	props: ['EventEmitter', 'title'],
	components: { Menu, MenuItem, MenuItemGroup, Submenu, Icon, IconModal },
	async mounted() {
		let list = await this.reloadList()
		list = list instanceof Array ? list : this.menuList
		const localSideBar = DB.get('sideBar') || {}
		const id = get(localSideBar, 'id', '')
		const index = list.findIndex(item => item.id === id)
		const target = get(list, index === -1 ? 0 : index, null)
		this.EventEmitter.emit('menuChange', target)
		document.body.addEventListener('click', this.closePop)
	},
	watch: {
		targetId(id) {
			const localSideBar = DB.get('sideBar') || {}
			const target = this.menuList.find(item => item.id === id)
			this.EventEmitter.emit('menuChange', target)
			const sideBar = localSideBar || {}
			sideBar.id = id
			sideBar.active = this.active
			sideBar.name = get(target, 'name', '')
			DB.set('sideBar', sideBar)
		},
	},
	updated() {
		const el = this.$el
		const height = get(el, 'offsetHeight', null)
		this.EventEmitter.emit('sideBarHeightChange', height)
		console.log('刷新dom', el)
	},
	methods: {
		async reloadList() {
			Loading.open()
			let extraList = await getMenu().catch(() => { })
			const result = uniqBy(extraList, 'id')
			if (extraList instanceof Array) {
				this.menuList = result
				const localSideBar = DB.get('sideBar') || {}
				const targetObj = merge(localSideBar, {
					menuList: result,
				})
				DB.set('sideBar', targetObj)
				return result
			}
		},
		collapse() {
			this.open = !this.open
			DB.set('sideBar', { open: this.open })
		},
		closePop(event) {
			if (this.$mobile) {
				this.open = false
			} else {
				let path = event.path || (event.composedPath && event.composedPath())
				const isCurrent = [...path].some(dom => {
					const classList = get(dom, 'classList', null)
					if (classList) {
						return ['el-dialog', this.classId, 'el-message-box'].some(item => dom.classList.contains(item))
					}
					return false
				})
				if (!isCurrent) {
					this.open = false
				}
			}
		},
		onSelect(index, indexPath) {
			this.active = index + ''
			const pathList = indexPath.map(path => `[${path - 1}]`)
			const target = get(this.menuList, pathList.join('.'), {})
			this.targetId = get(target, 'id', null)
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
				const target = get(this.menuList, '[0]', null)
				this.targetId = get(target, 'id', null)
			})
		},
	},
}
