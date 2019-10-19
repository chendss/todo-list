import Vue from 'vue'
import store from '@stores'
import config from './config'
import App from './App.vue'
import '@icon/iconfont.css'
import router from './Route'
import { Icon } from 'element-ui'
import { isMobile } from '@utils/flex.js'
import 'element-ui/lib/theme-chalk/index.css'
import Vue2TouchEvents from 'vue2-touch-events'

const vueUse = function() {
	Vue.use(Icon)
	Vue.use(Vue2TouchEvents)
}

const vueSetting = function() {
	Vue.config.productionTip = false
	Vue.prototype.$mobile = isMobile()
	Vue.prototype.$config = config
}

const vueInit = function() {
	new Vue({
		store,
		router,
		render: h => h(App),
	}).$mount('#app')
}

const vueEvent = function() {
	// flex()
	// window.addEventListener('load', flex)
	// window.addEventListener('resize', flex)
}

const main = function() {
	vueUse()
	vueEvent()
	vueSetting()
	vueInit()
}
main()
