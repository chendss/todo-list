import Icon from '@/Components/Icon'
import { get } from '@utils/index'
import { Button, Message } from 'element-ui'
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
				} else if (task.collect) {
					topTasks.push(task)
				} else {
					normalTasks.push(task)
				}
			}
			const result = [].concat(topTasks, normalTasks, bottomTasks)
			return result
		},
	},
	mounted() {
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
		async changeLog(index, key, value) {
			if (value === this.keepText) return
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
	},
}
