import Icon from '@/Components/Icon'
import { get } from '@utils/index'
import { Button, Message } from 'element-ui'
import { getLog, addLog, writeLog, delLog } from './interface'

const Msg = Message

export default {
  components: { Icon, Button },
  data () {
    return {
      tasks: [],
      id: '',
      title: 'oo',
      addFocus: false,
      text: ''
    }
  },
  props: ['EventEmitter'],
  computed: {
    thatTasks () {
      const tasks = [...this.tasks]
      tasks.sort((t1, t2) => {
        if (t1.status === true && t2.status === false) {
          return 1
        } else if (t1.collect === true && t2.collect === false) {
          return -1
        }
        return 0
      })
      console.log('排序结果', tasks)
      return tasks
    }
  },
  mounted () {
    this.EventEmitter.addListener('menuChange', this.onMenChange)
  },
  methods: {
    focusChange (flag) {
      this.addFocus = flag
      if (flag === false) {
        this.addTask()
      }
    },
    async onMenChange (target) {
      const { name, id } = target
      this.title = name
      this.id = id
      let res = await getLog(id)
      this.tasks = res
    },
    addKeypress (event) {
      const code = get(event, 'code', '')
      if (code === 'Enter') {
        this.addTask()
      }
    },
    async addTask () {
      const id = this.id
      const text = this.text
      await addLog(id, { text })
      this.tasks = await getLog(this.id)
      this.text = ''
      this.addFocus = false
    },
    async changeLog (index, key, value) {
      const obj = this.thatTasks[index]
      const { id } = obj
      await writeLog(id, { [key]: value })
      this.tasks = await getLog(this.id)
      Msg.success('修改成功')
    },
    async delLog (index) {
      const obj = this.thatTasks[index]
      const { id } = obj
      await delLog(id)
      Msg.success('删除成功')
      this.tasks = await getLog(this.id)
    }
  },
}