import Vue from 'vue'
import Router from 'vue-router'

import home from '@/page/home/home'
import mall from '@/page/mall/mall'
import profile from '@/page/profile/profile'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/home',
      component: home
    },
    {
      path: '/mall',
      component: mall
    },
    {
      path: '/profile',
      component: profile
    }
  ]
})
