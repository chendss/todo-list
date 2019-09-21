import Vue from 'vue'
import store from '@stores'
import App from './App.vue'
import '@icon/iconfont.css'
import router from './Route'
import flex from '@utils/flex.js'
import { isMobile } from '@utils/flex.js'
import VueLoading from 'vue-loading-template'

const vueUse = function() {
	Vue.use(VueLoading)
}

const vueSetting = function() {
	Vue.config.productionTip = false
	Vue.prototype.$mobile = isMobile()
}

const vueInit = function() {
	new Vue({
		store,
		router,
		render: h => h(App),
	}).$mount('#app')
}

const vueEvent = function() {
	flex()
	window.addEventListener('load', flex)
	window.addEventListener('resize', flex)
}

const main = function() {
	vueUse()
	vueEvent()
	vueSetting()
	vueInit()
}
main()
