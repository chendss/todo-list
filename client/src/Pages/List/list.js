import { get, DB } from '@utils/index'
import { EventEmitter } from 'events'
import ListHeader from '@/Components/ListHeader'
import ListSideBar from '@/Components/ListSideBar'
import ListContent from '@/Components/ListContent'

export default {
	data() {
		const localSideBar = DB.get('sideBar') || {}
		return {
			EventEmitter: new EventEmitter(),
			title: '',
			subItem: {
				sider: 0,
				content: 0,
			},
			height: 0,
			listId: null,
			listName: get(localSideBar, 'name', ''),
		}
	},
	components: { ListHeader, ListSideBar, ListContent },
	created() {
		console.log('list created')
		this.EventEmitter.addListener('menuChange', this.onMenChange)
	},
	mounted() {
		this.addListener()
		console.log(this.$route.params)
	},
	computed: {
		containerHeight() {
			const { sider, content } = this.subItem
			const result = Math.max(sider, content)
			return result
		},
	},
	methods: {
		addListener() {
			this.EventEmitter.addListener('sideBarHeightChange', height => {
				this.subItem.sider = height
			})
			this.EventEmitter.addListener('contentHeightChange', height => {
				this.subItem.content = height
			})
		},
		onMenChange(target) {
			const id = get(target, 'id', null)
			this.listId = id
			this.listName = get(target, 'name', '')
		},
	},
}
