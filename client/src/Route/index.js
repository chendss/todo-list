import Vue from 'vue'
import UserInfo from '@pages/UserInfo'
import Home from '@pages/Home'
import VueRouter from 'vue-router'
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
  ],
}

const route = new VueRouter(routeDict)

route.beforeEach((to, form, next) => {
  if (isMobile()) {
    console.log('手机端')
  } else {
    console.log('pc端')
  }
  next()
})

export default route
