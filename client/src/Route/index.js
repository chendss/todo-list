import Vue from 'vue'
import UserInfo from '@pages/UserInfo'
import Home from '@pages/Home'
import VueRouter from 'vue-router'
import { isMobile } from '@utils/flex'
import DB from '@utils/DB'

Vue.use(VueRouter)

const routeDict = {
	routes: [
		{
			path: '/',
			component: Home,
			name: 'home',
		},
		{
			path: '/userInfo/:type',
			component: UserInfo,
			name: 'UserInfo',
		},
	],
}

const route = new VueRouter(routeDict)

route.beforeEach((to, form, next) => {
	if (DB.get('token') == null) {
		if (to.path === '/' || to.path.includes('userInfo')) {
			next()
		} else {
			next('/')
		}
	} else {
		next()
	}
	if (isMobile()) {
		console.log('手机端')
	} else {
		console.log('pc端')
	}
})

export default route
