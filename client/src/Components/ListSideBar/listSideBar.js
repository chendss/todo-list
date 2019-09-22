import { Menu, MenuItem, MenuItemGroup, Submenu, MessageBox } from 'element-ui'
import Icon from '@/Components/Icon'
import menu from '@/Route/menu'

export default {
  data () {
    return {
      open: true,
      menuList: menu(),
    }
  },
  components: { Menu, MenuItem, MenuItemGroup, Submenu, Icon },
  methods: {
    collapse () {
      this.open = !this.open
    },
    async add () {
      let res = await MessageBox.prompt('请输入清单名称', '新增清单', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      })
      const { value } = res
      this.menuList.push({
        name: value,
        icon: 'icon-zhedie',
        type: 'custom'
      })
    }
  },
}
