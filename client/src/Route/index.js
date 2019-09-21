import Vue from 'vue'
import UserInfo from '@pages/UserInfo'
import Home from '@pages/Home'
import NotFound from '@pages/404'
import VueRouter from 'vue-router'
import List from '@pages/List'
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
		{
			path: '/404',
			component: NotFound,
			name: '404',
		},
		{
			path: '/list',
			component: List,
			name: 'list',
		},
	],
}

const route = new VueRouter(routeDict)

const checkMobile = function() {
	if (isMobile()) {
		console.log('手机端')
	} else {
		console.log('pc端')
	}
}

const checkRoute = function(to) {
	const { path } = to
	const routePaths = routeDict.routes.map(route => route.path)
	return routePaths.includes(path) || path.includes('userInfo')
}

route.beforeEach((to, form, next) => {
	const { path } = to
	if (checkRoute(to)) {
		if (DB.get('token') == null) {
			if (to.path === '/' || to.path.includes('userInfo')) {
				next()
			} else {
				next('/')
			}
		} else if (path.includes('userInfo')) {
			next('/list')
		} else {
			next()
		}
		// checkMobile()
	} else {
		next('/404')
	}
})

export default route
