import Icon from '@/Components/Icon'

export default {
  components: { Icon },
  data () {
    return {
      tasks: [],
      title: 'oo',
      addFocus: false
    }
  },
  props: ['id', 'EventEmitter'],
  computed: {
    thatTasks () {
      return this.tasks.concat([
        {
          status: true,
          text: '测试',
          collection: false
        },
        {
          status: false,
          text: '测试2',
          collection: true
        },
      ])
    }
  },
  mounted () {
    this.EventEmitter.addListener('menuChange', title => this.title = title)
  },
  methods: {
    focusChange (flag) {
      this.addFocus = flag
    }
  },
}