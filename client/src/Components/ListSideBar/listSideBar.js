import { Menu, MenuItem, MenuItemGroup, Submenu, MessageBox } from 'element-ui'
import Icon from '@/Components/Icon'
import { get } from '@utils/index.js'
import { uniqBy } from 'lodash'
import { getMenu, addMenu } from './interface'

export default {
  data () {
    return {
      open: true,
      menuList: [],
    }
  },
  props: ['EventEmitter', 'title'],
  components: { Menu, MenuItem, MenuItemGroup, Submenu, Icon },
  mounted () {
    this.reloadList()
  },
  methods: {
    async reloadList () {
      let extraList = await getMenu()
      let menuList = this.menuList.concat(extraList)
      this.menuList = uniqBy(menuList, 'id')
    },
    collapse () {
      this.open = !this.open
    },
    onSelect (index, indexPath) {
      const pathList = indexPath.map(path => `[${path - 1}]`)
      const target = get(this.menuList, pathList.join('.'), {})
      this.EventEmitter.emit('menuChange', target)
    },
    async add () {
      if (!this.open) return
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
      this.reloadList()
    }
  },
}
