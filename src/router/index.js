import Vue from 'vue'
import Router from 'vue-router'

import home from '../page/home/home'
import homeIndex from '../page/home/index/index'
import tasteDetails from '../page/home/tasteDetails/tasteDetails'

import mall from '../page/mall/mall'
import mallIndex from '../page/mall/index/index'
import goodsDetails from '../page/mall/goodsDetails/goodsDetails'

import profile from '../page/profile/profile'
import profileIndex from '../page/profile/index/index'
import personal from '../page/profile/personal/personal'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '',
      component: home,
      children: [
        {
          path: '',
          component: homeIndex
        },
        {
          path: 'tasteDetails/:id',
          name: 'tasteDetails',
          component: tasteDetails
        }
      ]
    },
    {
      path: '/mall',
      component: mall,
      children: [
        {
          path: '',
          component: mallIndex
        },
        {
          path: 'goodsDetails/:id',
          name: 'goodsDetails',
          component: goodsDetails
        }
      ]
    },
    {
      path: '/profile',
      component: profile,
      children: [
        {
          path: '',
          name: 'index',
          component: profileIndex
        },
        {
          path: 'personal',
          name: 'personal',
          component: personal
        }
      ]
    }
  ]
})
