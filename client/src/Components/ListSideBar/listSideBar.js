import { Menu, MenuItem, MenuItemGroup, Submenu } from 'element-ui'
import Icon from '@/Components/Icon'
import menu from '@/Route/menu'

export default {
  data () {
    return {
      open: true,
      menuList: menu()
    }
  },
  components: { Menu, MenuItem, MenuItemGroup, Submenu, Icon },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    collapse () {
      console.log('fuck')
      this.open = !this.open
    },
    add () { }
  },
}
