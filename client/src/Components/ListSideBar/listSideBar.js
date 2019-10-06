import { uniqBy } from 'lodash'
import Icon from '@/Components/Icon'
import Loading from '@utils/loading'
import { get, random } from '@utils/index.js'
import { getMenu, addMenu, delMenu } from './interface'
import { Menu, MenuItem, MenuItemGroup, Submenu, MessageBox, Message } from 'element-ui'

export default {
  data () {
    return {
      open: false,
      menuList: [],
      height: null,
      active: '1',
      classId: random()
    }
  },
  props: ['EventEmitter', 'title'],
  components: { Menu, MenuItem, MenuItemGroup, Submenu, Icon },
  mounted () {
    this.reloadList()
    this.EventEmitter.addListener('heightChange', height => {
      this.height = height
    })
    this.EventEmitter.emit('menuChange', this.menuList[0])
    document.body.addEventListener('click', this.closePop)
  },
  methods: {
    async reloadList () {
      Loading.open()
      let extraList = await getMenu()
      Loading.close()
      this.menuList = uniqBy(extraList, 'id')
    },
    collapse () {
      this.open = !this.open
    },
    closePop (event) {
      const isCurrent = [...event.path].some(dom => {
        const classList = get(dom, 'classList', null)
        if (classList) {
          return classList.contains(this.id) || dom.classList.contains(this.classId)
        }
        return false
      })
      if (!isCurrent) {
        this.open = false
      }
    },
    onSelect (index, indexPath) {
      this.active = index
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
        type: 'custom',
      }
      Loading.open()
      await addMenu(data)
      this.reloadList()
    },
    delMenu (id, name) {
      MessageBox.confirm(`是否删除 ${name} 清单？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error',
      }).then(async () => {
        Loading.open()
        await delMenu(id)
        await this.reloadList()
        Message.success('删除成功')
        this.EventEmitter.emit('menuChange', this.menuList[0])
      })
    },
  },
}
