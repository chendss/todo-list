export default {
  data () {
    return {
      subMenu: [],
      title: 'oo'
    }
  },
  props: ['id', 'EventEmitter'],
  computed: {
    subMenus () {
      return this.subMenu.concat([
        {
          text: '',
        }
      ])
    }
  },
  mounted () {
    this.EventEmitter.addListener('menuChange', title => this.title = title)
  },
}