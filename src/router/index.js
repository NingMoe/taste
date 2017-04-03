import Vue from 'vue'
import Router from 'vue-router'

import face from '@/components/face/face'
import mall from '@/components/mall/mall'
import profile from '@/components/profile/profile'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/face',
      name: 'face',
      component: face
    },
    {
      path: '/mall',
      name: 'mall',
      component: mall
    },
    {
      path: '/profile',
      name: 'profile',
      component: profile
    }
  ]
})
