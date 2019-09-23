import { get } from '@utils/index'
import { action } from './interface'
import Icon from '@widget/Icon/index.vue'
import { Message, Form, FormItem, Input, Button } from 'element-ui'

const message = Message

export default {
  components: { Form, FormItem, ElementInput: Input, Button, Icon },
  data () {
    return {
      param: {
        username: 'dashao',
        password: 'cyl1314',
        confirmPassword: 'cyl1314',
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
          await action(this.type, username, password)
          message.success({ message: msg, duration: 1000 })
          this.$router.push('/list')
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
