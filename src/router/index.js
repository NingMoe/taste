import Vue from 'vue'
import Router from 'vue-router'

import home from '../page/home/home'
import homeIndex from '../page/home/index/index'
import tasteDetails from '../page/home/tasteDetails/tasteDetails'
import tasteRegister from '../page/home/tasteRegister/tasteRegister'

import mall from '../page/mall/mall'
import mallIndex from '../page/mall/index/index'
import goodsDetails from '../page/mall/goodsDetails/goodsDetails'

import profile from '../page/profile/profile'
import profileIndex from '../page/profile/index/index'
import personal from '../page/profile/personal/personal'
import list from '../page/profile/list/list'
import myReport from '../page/profile/myReport/myReport'

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
        }
      ]
    },
    {
      path: '/home',
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
        },
        {
          path: 'tasteRegister/:id',
          name: 'tasteRegister',
          component: tasteRegister
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
        },
        {
          path: 'list/:name',
          name: 'list',
          component: list
        },
        {
          path: 'myReport/:id',
          name: 'myReport',
          component: myReport
        }
      ]
    }
  ]
})
