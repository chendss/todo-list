import Vue from 'vue'
import store from '@stores'
import App from './App.vue'
import router from './Route'
import flex from '@utils/flex.js'
import { isMobile } from '@utils/flex.js'
import VueSweetalert2 from 'vue-sweetalert2'

const vueUse = function() {
	Vue.use(VueSweetalert2)
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
