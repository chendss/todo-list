import Vue from 'vue'
import routers from './Route'
import App from './App.vue'
import store from '@store'
import VueRouter from 'vue-router'
import { get } from '@utils'

const vueUse = function () {
  Vue.use(VueRouter)
}

const vueSetting = function () {
  Vue.config.productionTip = false
}

const vueInit = function () {
  new Vue({
    store,
    router: new VueRouter(routers),
    render: h => h(App),
  }).$mount('#app')
}

const main = function () {
  vueUse()
  vueSetting()
  vueInit()
}
main()