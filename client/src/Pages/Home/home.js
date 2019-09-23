import { DB } from '@utils/index'

export default {
  data () {
    return {}
  },
  created () {
    DB.clear()
  },
  methods: {
    register () {
      this.$router.push('/userInfo/register')
    },
    login () {
      this.$router.push('/userInfo/login')
    },
  },
}
