<template>
  <div id="app">
    <router-view :appData="appData"></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'app',
    data () {
      return {
        appData: {}
      }
    },
    mounted () {
      // this.$http.get('/static/mock/appData.json').then((res) => {
      this.$http.get('/web/appInitData').then((res) => {
        this.appData = res.body
      })
      /*
      window.wxConfig = () => {
        this.$http.get('/web/getWxConfig', {params: {cururl: window.location.href}}).then(res => {
          wx.config({
            debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: res.body.appid,  // 必填，公众号的唯一标识
            timestamp: res.body.timestamp,  // 必填，生成签名的时间戳
            nonceStr: res.body.nonceStr,  // 必填，生成签名的随机串
            signature: res.body.signature, // 必填，签名，见附录1
            jsApiList: [
              'chooseImage',
              'onMenuShareTimeline',
              'onMenuShareAppMessage',
              'uploadImage',
              'downloadImage'
            ]  // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          })
        })
      }
      window.wxConfig()
      wx.ready(() => {
        wx.onMenuShareTimeline({
          title: '测试', // 分享标题
          link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: 'http://www.lzsunspot.com/static/images/logo.png', // 分享图标
          success: function () {
            // 用户确认分享后执行的回调函数
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
          }
        })
      })
      */
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import './common/common.css';

</style>
