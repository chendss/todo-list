import { Menu, MenuItem, MenuItemGroup, Submenu, MessageBox, Message } from 'element-ui'
import Icon from '@/Components/Icon'
import menu from '@/Route/menu'
import { getMenu, addMenu } from './interface'

export default {
  data () {
    return {
      open: true,
      menuList: menu(),
    }
  },
  components: { Menu, MenuItem, MenuItemGroup, Submenu, Icon },
  async mounted () {
    let extraList = await getMenu()
    this.menuList = this.menuList.concat(extraList)
  },
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
      const data = {
        name: value,
        type: 'custom'
      }
      await addMenu(data)
      this.menuList.push({
        ...data,
        icon: 'icon-zhedie',
      })
    }
  },
}
