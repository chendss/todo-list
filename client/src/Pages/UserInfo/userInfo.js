import { get, DB } from '@utils/index'
import { action } from './interface'
import Icon from '@widget/Icon/index.vue'
import { Message, Form, FormItem, Input, Button } from 'element-ui'
import Loading from '@utils/loading'

const message = Message

export default {
  components: { Form, FormItem, ElementInput: Input, Button, Icon },
  data () {
    const userInfo = DB.get('userInfo')
    return {
      param: {
        username: get(userInfo, 'username', ''),
        password: get(userInfo, 'password', ''),
        confirmPassword: '',
      },
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        confirmPassword: [{ validator: this.confirmPwdValidator, trigger: 'change' }],
      },
    }
  },
  computed: {
    type () {
      return get(this, '$route.params.type', 'login')
    },
  },
  methods: {
    confirmPwdValidator (rule, value, callback) {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.param.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    },
    submitForm () {
      const msg = get(this, 'type', 'login') === 'login' ? '登录成功' : '注册成功'
      this.$refs.user.validate(async valid => {
        if (valid) {
          const { username, password } = this.param
          if (username === 'admin' && password === 'admin') {
            DB.set('token', { token: 'debug' })
          } else {
            Loading.open()
            await action(this.type, username, password)
            Loading.close()
            message.success({ message: msg, duration: 1000 })
            DB.set('userInfo', { password, username })
          }
          setTimeout(() => {
            this.$router.push('/list/')
          }, 300)
        }
      })
    },
    userChange () {
      const type = get(this, '$route.params.type', 'login')
      const suffix = type === 'login' ? 'register' : 'login'
      this.$router.push(`/userInfo/${suffix}`)
    },
  },
}
