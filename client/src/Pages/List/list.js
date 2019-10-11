import { EventEmitter } from 'events'
import ListHeader from '@/Components/ListHeader'
import ListSideBar from '@/Components/ListSideBar'
import ListContent from '@/Components/ListContent'

export default {
	data() {
		return {
			EventEmitter: new EventEmitter(),
			title: '',
			subItem: {
				sider: 0,
				content: 0
			},
			height: 0
		}
	},
	components: { ListHeader, ListSideBar, ListContent },
	mounted() {
		this.EventEmitter.addListener('sideBarHeightChange',height => {
			this.subItem.sider = height
		})
		this.EventEmitter.addListener('contentHeightChange',height => {
			this.subItem.content = height
		})
	},
	computed: {
		containerHeight() {
			const { sider, content } = this.subItem
			const result = Math.max(sider, content)
			return result
		}
	},
	methods: {
	},
}
