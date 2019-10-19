import Vue from 'vue'
import DB from '@utils/DB'
import Home from '@pages/Home'
import List from '@pages/List'
import NotFound from '@pages/404'
import VueRouter from 'vue-router'
import { get } from '@utils/index'
import UserInfo from '@pages/UserInfo'
import { isMobile } from '@utils/flex'

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
			path: '/list/:id',
			component: List,
			name: 'listDy',
		},
		{
			path: '/list/',
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

const includesPath = function(path) {
	const list = ['userInfo', '/list/', '/list']
	const result = list.some(item => path.includes(item))
	return result
}

const checkRoute = function(to) {
	const { path } = to
	const routePaths = routeDict.routes.map(route => route.path)
	return routePaths.includes(path) || includesPath(path)
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
			next('/list/')
		} else {
			next()
		}
		// checkMobile()
	} else {
		next('/404')
	}
})

route.goHome = function() {
	const path = get(route, 'history.current.path', null)
	if (path !== '/') {
		route.push('/')
	}
}

export default route
