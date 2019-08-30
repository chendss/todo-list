import Vue from 'vue'
import store from '@store'
import App from './App.vue'
import routers from './Route'
import VueRouter from 'vue-router'

const vueUse = function() {
	Vue.use(VueRouter)
}

const vueSetting = function() {
	Vue.config.productionTip = false
}

const vueInit = function() {
	new Vue({
		store,
		router: new VueRouter(routers),
		render: h => h(App),
	}).$mount('#app')
}

const main = function() {
	vueUse()
	vueSetting()
	vueInit()
}
main()
