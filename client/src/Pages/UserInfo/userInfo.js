import { get } from "@utils/index"

export default {
  data () {
    return {
      type: 'register',
      text: ''
    }
  },
  created () {
    this.type = get(this, '$route.params.type', 'register')
    this.text = this.type === 'register' ? '注册' : '登录'
  },
}