import Icon from '@/Components/Icon'
import { get } from '@utils/index'
import { getLog, addLog, writeLog } from './interface'

export default {
  components: { Icon },
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
      return this.tasks.concat([

      ])
    }
  },
  mounted () {
    this.EventEmitter.addListener('menuChange', this.onMenChange)
  },
  methods: {
    focusChange (flag) {
      this.addFocus = flag
    },
    async onMenChange (target) {
      const { name, id } = target
      this.title = name
      this.id = id
      let res = await getLog(id)
      this.tasks = res
    },
    async addTask (event) {
      const code = get(event, 'code', '')
      const id = this.id
      if (code === 'Enter') {
        const text = this.text
        await addLog(id, { text })
        this.tasks = await getLog(this.id)
        this.text = ''
        this.addFocus = false
      }
    },
    async changeLog (index, key, value) {
      const obj = this.thatTasks[index]
      const { id } = obj
      await writeLog(id, { [key]: value })
      this.tasks = await getLog(this.id)
    }
  },
}