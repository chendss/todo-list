import Icon from '@/Components/Icon'
import Loading from '@utils/loading'
import { get, isMobile } from '@utils/index'
import { getLog, addLog, writeLog, delLog } from './interface'
import { Button, Message, MessageBox, Input } from 'element-ui'

const Msg = Message

export default {
	components: { Icon, Button, EleInput: Input },
	data() {
		return {
			text: '',
			tasks: [],
			keepText: '',
			addFocus: false,
		}
	},
	props: ['EventEmitter', 'id', 'title'],
	computed: {
		thatTasks() {
			const tasks = [...this.tasks]
			const [topTasks, normalTasks] = [[], []]
			for (let task of tasks) {
				if (task.collection) {
					topTasks.push(task)
				} else {
					normalTasks.push(task)
				}
			}
			const result = [].concat(topTasks, normalTasks)
			return result
		},
	},
	watch: {
		id(id) {
			console.log('log id', id)
			this.loadLog(id)
		},
	},
	mounted() {
		console.log('list content init')
	},
	updated() {
		const el = this.$el
		const height = get(el, 'offsetHeight', null)
		this.EventEmitter.emit('contentHeightChange', height)
		console.log('刷新dom', el)
	},
	methods: {
		focusChange(flag) {
			this.addFocus = flag
			if (flag === false) {
				this.addTask()
			}
		},
		async loadLog(id) {
			Loading.open()
			let res = await getLog(id)
			Loading.close()
			this.tasks = res
		},
		addKeypress(event) {
			const code = get(event, 'code', '')
			if (code === 'Enter') {
				this.addTask()
			}
		},
		async addTask() {
			const id = this.id
			const text = this.text
			if (get(text, 'length', 0) > 0) {
				Loading.open()
				await addLog(id, { text })
				this.tasks = await getLog(this.id)
				Loading.close()
				this.text = ''
			}
			this.addFocus = false
		},
		onFocus(event) {
			this.keepText = get(event, 'target.value', '')
			const dom = get(event, 'target', null)
			dom && dom.scrollIntoViewIfNeeded()
		},
		async changeLog(index, key, handleType = 'string') {
			let value = get(this.thatTasks, `[${index}].${key}`, null)
			if (handleType === 'bool') {
				value = !value
			}
			if (value === this.keepText && key === 'content') return
			const obj = this.thatTasks[index]
			const { id } = obj
			Loading.open()
			await writeLog(id, { [key]: value })
			this.tasks = await getLog(this.id)
			Loading.close()
			Msg.success('修改成功')
		},
		async delLog(index) {
			const obj = this.thatTasks[index]
			const { id } = obj
			Loading.open()
			await delLog(id)
			this.tasks = await getLog(this.id)
			Msg.success('删除成功')
			Loading.close()
		},
		swipeLeft(index) {
			if (isMobile() === true) {
				MessageBox.confirm('是否删除该项？', '警告', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'error',
				}).then(() => {
					this.delLog(index)
				})
			}
		},
	},
}
