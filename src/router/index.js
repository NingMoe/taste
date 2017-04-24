import Vue from 'vue'
import Router from 'vue-router'

import home from '../page/home/home'
import homeIndex from '../page/home/index/index'
import activityDetail from '../page/home/activityDetail/activityDetail'
import activityRegister from '../page/home/activityRegister/activityRegister'
import articleDetail from '../page/home/articleDetail/articleDetail'

import mall from '../page/mall/mall'
import mallIndex from '../page/mall/index/index'
import goodsDetail from '../page/mall/goodsDetail/goodsDetail'

import profile from '../page/profile/profile'
import profileIndex from '../page/profile/index/index'
import personal from '../page/profile/personal/personal'
import list from '../page/profile/list/list'
import myReport from '../page/profile/myReport/myReport'

import notFound from '../page/other/notFound/notFound'
import join from '../page/other/join/join'
import cooperation from '../page/other/cooperation/cooperation'
import firstTime from '../page/other/firstTime/firstTime'

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
          path: 'activityDetail/:id',
          name: 'activityDetail',
          component: activityDetail
        },
        {
          path: 'activityRegister/:id',
          name: 'activityRegister',
          component: activityRegister
        },
        {
          path: 'articleDetail/:id',
          name: 'articleDetail',
          component: articleDetail
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
          path: 'goodsDetail/:id',
          name: 'goodsDetail',
          component: goodsDetail
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
    },
    {
      path: '/other/notFound',
      name: 'notFound',
      component: notFound
    },
    {
      path: '/other/join',
      name: 'join',
      component: join
    },
    {
      path: '/other/cooperation',
      name: 'cooperation',
      component: cooperation
    },
    {
      path: '/other/firstTime/:id',
      name: 'firstTime',
      component: firstTime
    }
  ]
})
