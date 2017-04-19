<template>
  <article class="tasteDetails" v-if="tasteData.activity">
    <h1>{{ tasteData.activity.name }}</h1>
    <div class="info">{{ tasteData.activity.username }}  {{ tasteData.activity.addtime }}</div>
    <div class="content" v-html="tasteData.activity.content"></div>
    <div class="rules">
      <header><img src="./rules-title.png" alt=""></header>
      <div class="rules-content" v-html="tasteData.activity.rules"></div>
    </div>

    <div class="task" v-if="tasteData.enrollList.length">
      <h2>体验任务 <span>查看并分享下方文章给好友就能获得积分噢~</span></h2>
      <ul>
        <li v-for="item in tasteData.articleList">
          <router-link :to="{name: 'articleDetail', params: {id: item.id}}">
            <div class="task-item-face img-width">
              <img src="/static/temp/item-face.jpg" alt="">
            </div>
            <div class="content">
              <div class="title">{{item.title}}</div>
              <span class="points">{{item.score}}积分</span>
              <div class="task-btn bg-blue" v-if="isDone(item)">已完成</div>
              <div class="task-btn bg-red" v-else>未完成</div>
            </div>
          </router-link>
        </li>
      </ul>
    </div>

    <div class="reg-info" v-if="tasteData.enrollList.length">
      <h2>报名信息</h2>
      <ul>
        <li v-for="item in tasteData.enrollList">
          {{item.question}}: {{item.answer}}
        </li>
      </ul>
    </div>

    <div class="tasteDetails-btns common-bottom-btns" v-if="userInfo">
      <div class="join-btn btn">
        <router-link v-if="userInfo.isanswer === 0" :to="{name: 'firstTime', params: {id: $route.params.id}}">立即参加</router-link>
        <span v-else-if="!tasteData.enrollList">已参加</span>
        <router-link v-else :to="{name: 'activityRegister', params: {id: $route.params.id}}">立即参加</router-link>
      </div>
      <div class="back-btn btn" @click="back">返回</div>
    </div>
  </article>
</template>

<script type="text/ecmascript-6">
  export default{
    name: 'tasteDetails',
    data () {
      return {
        tasteData: {}
      }
    },
    props: {
      userInfo: {
        type: Object
      }
    },
    mounted () {
      // this.$http.get('/static/mock/taste.json', {id: this.$route.params.id}).then((res) => {
      this.$http.get('/web/getActivityDetail', {params: {id: this.$route.params.id}}).then((res) => {
        this.tasteData = res.body
        this.$nextTick(() => {
          window.wxConfig(window.location.href, res.body.activity.name)
        })
        /*
        this.$http.get('/web/getWxConfig', {params: {cururl: window.location.href}}).then(data => {
          wx.config({
            debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: data.body.appid,  // 必填，公众号的唯一标识
            timestamp: data.body.timestamp,  // 必填，生成签名的时间戳
            nonceStr: data.body.nonceStr,  // 必填，生成签名的随机串
            signature: data.body.signature, // 必填，签名，见附录1
            jsApiList: [
              'chooseImage',
              'onMenuShareTimeline',
              'onMenuShareAppMessage',
              'uploadImage',
              'downloadImage'
            ]  // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          })
          wx.ready(() => {
            wx.onMenuShareTimeline({
              title: res.body.activity.name, // 分享标题
              link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: 'http://www.lzsunspot.com/static/images/logo.png', // 分享图标
              success: function () {
                // 用户确认分享后执行的回调函数
              },
              cancel: function () {
                // 用户取消分享后执行的回调函数
              }
            })
            wx.showMenuItems({
              menuList: ['menuItem:share:timeline', 'menuItem:share:appMessage'] // 要显示的菜单项，所有menu项见附录3
            })
          })
        })
        */
      })
    },
    methods: {
      back () {
        history.back()
      },
      isDone (item) {
        return this.userInfo.taskdone === null ? false : (this.userInfo.taskdone.indexOf(',' + item.id + ',') > 0)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

  .tasteDetails
    padding: 12px 12px 50px 12px
    background: #fff
    h1
      font-size: 18px
      line-height: 1.3
    .info
      margin: 8px 0 15px 0
    .content
      line-height: 1.4
      img
        max-width: 100%
    .rules
      margin: 25px 5px 25px 0
      padding: 10px 10px 10px 20px
      position: relative
      line-height: 1.4
      border: 1px solid #fabe00
      header img
        width: 90px
        height: auto
      .rules-content
        margin: 15px 0
    .rules:after
      content: ''
      display: block
      height: 100%
      width: 100%
      position: absolute
      left: 5px
      bottom: 5px
      border: 1px solid #fabe00
    .task
      & span
        font-size: 12px
      ul li
        margin-bottom: 10px
      ul li a
        display: flex
      .content
          flex: 1
          padding-left: 8px
          position: relative
        .task-item-face
          width: 38%
        .desc
          font-size: 12px
          color: #999
        .points
          position: absolute
          left: 8px
          bottom: 0
        .task-btn
          padding: 4px 8px
          position: absolute
          right: 0
          bottom: 0
          font-size: 12px
          color: #fff
    .task h2,.reg-info h2
      margin-bottom:15px
      font-size: 18px
      font-weight: bold
    .reg-info
      margin-top: 25px
      li
        margin: 8px 0
</style>
