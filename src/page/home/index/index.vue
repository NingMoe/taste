<template>
  <section class="home">
    <header class="head">
      <h1>所有体验</h1>
      <swipe class="home-swipe" :auto="5000" :speed="300" v-if="tasteList">
        <swipe-item v-for="item in carousels" :key="item.id">
          <a :href="item.href">
            <img :src="item.img">
          </a>
        </swipe-item>
      </swipe>
    </header>
    <div class="text-center" v-if="!tasteList">没有查找到相关数据</div>
    <ul class="taste-list">
      <li v-for="taste in tasteList" @click="toDetails(taste.id)">
        <div class="taste-face">
          <img :src="taste.imgsrc">
          <div class="status-sign"> {{ signText(taste) }} </div>
        </div>
        <div class="content">
          <h2>{{ taste.name }}</h2>
        </div>
      </li>
    </ul>
    <v-nav :name="name"></v-nav>
  </section>

</template>

<script type="text/ecmascript-6">
  import vNav from '@/components/nav/nav'
  export default{
    name: 'homeIndex',
    data () {
      return {
        name: 'home'
      }
    },
    props: {
      tasteList: {
        type: Array
      },
      carousels: {
        type: Array
      },
      nowDate: {
        type: String
      }
    },
    methods: {
      toDetails (id) {
        this.$router.push({name: 'activityDetail', params: { id: id }})
      },
      signText (taste) {
        let now = Date.parse(this.nowDate)
        let beginTime = Date.parse(taste.enrollbegintime)
        let endTime = Date.parse(taste.endtime)
        if (now < beginTime) {
          return '即将开始'
        } else if (now < endTime) {
          let outTime = Math.floor(endTime / 86400000) - Math.floor(now / 86400000)
          return outTime === 0 ? '今天结束' : outTime + 1 + '天后结束'
        } else {
          return '已结束'
        }
      }
    },
    components: { vNav },
    mounted () {
      window.wxConfig()
      /*
      setTimeout(() => {
        this.$http.get('/web/getWxConfig', {params: {cururl: window.location.href}}).then(res => {
          window.wx.config({
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
              'downloadImage',
              'showMenuItems',
              'showAllNonBaseMenuItem',
              'showOptionMenu'
            ]  // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          })
        })
        window.wx.ready(() => {
          window.wx.onMenuShareTimeline({
            title: document.title, // 分享标题
            link: 'http://' + window.location.hostname, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: 'http://www.lzsunspot.com/static/images/logo.png', // 分享图标
            success: function () {},
            cancel: function () {}
          })
          window.wx.onMenuShareAppMessage({
            title: document.title, // 分享标题
            desc: document.title, // 分享描述
            link: 'http://' + window.location.hostname, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: 'http://www.lzsunspot.com/static/images/logo.png', // 分享图标
            success: function () {},
            cancel: function () {}
          })
        })
      }, 3000)
      */
    },
    computed: {}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '/static/vue-swipe.css'

  .home
    padding-bottom: 40px
    .head
      padding:20px
      h1
        margin-bottom: 10px
        font-size: 16px
      .home-swipe
        height: 186px
        color: #fff
        font-size: 30px
        text-align: center
      .home-swipe img
        width: 100%
    .taste-list li
      margin-bottom: 10px
      padding:15px 20px
      background: #ffffff
      .taste-face
        margin-bottom: 10px
        position: relative
        .status-sign
          position: absolute
          top: -1px
          left: 1.2em
          color: #fff
          height: 2.4em
          line-height: 2.4
          padding: 0 10px
          background: #fabe00
          font-size: 12px
          text-align: center
        .status-sign:before
          content: ''
          display: block
          width: 0
          height: 0
          position: absolute
          left:-1.2em
          border-top: 0.6em solid #fabe00
          border-right: 0.6em solid #fabe00
          border-left: 0.6em solid transparent
          border-bottom: 0.6em solid transparent
        .status-sign:after
          content: ''
          display: block
          width: 0
          height: 0
          position: absolute
          left: -1.2em
          bottom: 0
          border-top: 0.6em solid transparent
          border-right: 0.6em solid #fabe00
          border-left: 0.6em solid transparent
          border-bottom: 0.6em solid #fabe00
      .content
        h2
          font-size: 16px
          margin-bottom: 6px
        p
          line-height: 1.2
          padding-bottom: 10px
          border-bottom: 2px solid #eb191a
      img
        width: 100%


</style>
