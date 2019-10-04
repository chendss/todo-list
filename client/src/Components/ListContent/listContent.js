import Icon from '@/Components/Icon'
import { get, isMobile } from '@utils/index'
import { Button, Message, MessageBox } from 'element-ui'
import { getLog, addLog, writeLog, delLog } from './interface'

const Msg = Message

export default {
	components: { Icon, Button },
	data() {
		return {
			tasks: [],
			id: '',
			title: 'oo',
			addFocus: false,
			text: '',
			keepText: '',
		}
	},
	props: ['EventEmitter'],
	computed: {
		thatTasks() {
			const tasks = [...this.tasks]
			const [topTasks, bottomTasks, normalTasks] = [[], [], []]
			for (let task of tasks) {
				if (task.status) {
					bottomTasks.push(task)
				} else {
					if (task.collection) {
						topTasks.push(task)
					} else {
						normalTasks.push(task)
					}
				}
			}
			const result = [].concat(topTasks, normalTasks, bottomTasks)
			return result
		},
	},
	mounted() {
		console.log('list content init')
		this.EventEmitter.addListener('menuChange', this.onMenChange)
	},
	methods: {
		focusChange(flag) {
			this.addFocus = flag
			if (flag === false) {
				this.addTask()
			}
		},
		async onMenChange(target) {
			const { name, id } = target
			this.title = name
			this.id = id
			let res = await getLog(id)
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
				await addLog(id, { text })
				this.tasks = await getLog(this.id)
				this.text = ''
			}
			this.addFocus = false
		},
		onFocus(event) {
			this.keepText = get(event, 'target.value', '')
		},
		async changeLog(index, key, handleType = 'string') {
			let value = get(this.thatTasks, `[${index}].${key}`, null)
			if (handleType === 'bool') {
				value = !value
			}
			if (value === this.keepText && key === 'content') return
			const obj = this.thatTasks[index]
			const { id } = obj

			await writeLog(id, { [key]: value })
			this.tasks = await getLog(this.id)
			Msg.success('修改成功')
		},
		async delLog(index) {
			const obj = this.thatTasks[index]
			const { id } = obj
			await delLog(id)
			Msg.success('删除成功')
			this.tasks = await getLog(this.id)
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
