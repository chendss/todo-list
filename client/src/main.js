import Vue from 'vue'
import Notifications from 'vue-notification'
import store from '@stores'
import App from './App.vue'
import router from './Route'

const vueUse = function () {
  Vue.use(Notifications)
}

const vueSetting = function () {
  Vue.config.productionTip = false
}

const vueInit = function () {
  new Vue({
    store,
    router,
    render: h => h(App),
  }).$mount('#app')
}

const main = function () {
  vueUse()
  vueSetting()
  vueInit()
}
main()
