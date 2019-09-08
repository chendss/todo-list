import Vue from 'vue'
import store from '@store'
import App from './App.vue'
import router from './Route'

const vueUse = function() {}

const vueSetting = function() {
	Vue.config.productionTip = false
}

const vueInit = function() {
	new Vue({
		store,
		router,
		render: h => h(App),
	}).$mount('#app')
}

const main = function() {
	vueUse()
	vueSetting()
	vueInit()
}
main()
