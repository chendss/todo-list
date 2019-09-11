export default {
  data () {
    return {}
  },
  created () { },
  methods: {
    register () {
      console.log('ww')
      this.$notify({
        title: 'Important message',
        text: 'Hello user! This is a notification!'
      })
      return
      this.$router.push('/userInfo/register')
    },
    login () {
      this.$router.push('/userInfo/login')
    }
  },
}
