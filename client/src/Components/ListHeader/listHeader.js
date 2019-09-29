import Icon from '@/Components/Icon'
import { Input, Message } from 'element-ui'
import { updateToken } from '@/Utils/request'
import avatar from '@/assets/img/头像.jpg'

const Msg = Message

export default {
  data () {
    return {
      searchText: '',
    }
  },
  methods: {
    searchChange (val) {
      this.$emit('change', val)
    },
    async updateToken () {
      await updateToken()
      Msg.success('更新token成功')
    }
  },
  computed: {
    imgSrc () {
      return this.avatar || avatar
    },
  },
  props: ['avatar', 'name'],
  components: { Icon, EleInput: Input },
}
