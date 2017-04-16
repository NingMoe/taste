// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import resource from 'vue-resource'

// 引入表单验证插件
import VeeValidate from 'vee-validate'
Vue.use(VeeValidate)

// 引入轮播组件 vue-swipe
import { Swipe, SwipeItem } from 'vue-swipe'
Vue.component('swipe', Swipe)
Vue.component('swipe-item', SwipeItem)

// 引入自定义弹窗组件
import uiDialog from '@/components/dialog/dialog'
Vue.component('ui-dialog', uiDialog)

Vue.config.productionTip = false
Vue.use(resource)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

