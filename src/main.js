// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import resource from 'vue-resource'
import wx from 'weixin-js-sdk'

window.wxConfig = (cururl, title, img) => {
  Vue.http.get('/web/getWxConfig', {params: {cururl: window.location.href}}).then(res => {
    wx.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: res.body.appid,  // 必填，公众号的唯一标识
      timestamp: res.body.timestamp,  // 必填，生成签名的时间戳
      nonceStr: res.body.nonceStr,  // 必填，生成签名的随机串
      signature: res.body.signature, // 必填，签名，见附录1
      jsApiList: [
        'chooseImage',
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'uploadImage',
        'downloadImage',
        'showMenuItems',
        'showAllNonBaseMenuItem',
        'showOptionMenu'
      ]  // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    })
  })
  wx.ready(() => {
    wx.onMenuShareTimeline({
      title: title || document.title, // 分享标题
      link: cururl || window.location.hostname, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: img || 'http://www.lzsunspot.com/static/images/logo.png', // 分享图标
      success: function () {},
      cancel: function () {}
    })
    wx.onMenuShareAppMessage({
      title: title || document.title, // 分享标题
      desc: title || document.title, // 分享描述
      link: cururl || window.location.hostname, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: img || 'http://www.lzsunspot.com/static/images/logo.png', // 分享图标
      success: function () {},
      cancel: function () {}
    })
    // wx.showMenuItems({
    //   menuList: ['menuItem:share:timeline', 'menuItem:share:appMessage'] // 要显示的菜单项，所有menu项见附录3
    // })
    // wx.showAllNonBaseMenuItem()
    wx.showOptionMenu()
  })
}

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
