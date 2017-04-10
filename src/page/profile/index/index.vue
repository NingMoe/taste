<template>
  <section class="profile" v-if="userInfo">
    <header class="head">
      <div class="avatar img-width">
        <img src="./avatar.jpg" alt="">
      </div>
      <div class="nick">{{ userInfo.nick }}</div>
      <div class="points">
        剩余积分: {{ userInfo.points }}
      </div>
      <router-link to="profile/personal">账户管理 ></router-link>
    </header>

    <div class="module my-taste">
      <div class="module-head clearfix">
        <h2 class="fl">我的体验</h2>
        <div class="more-btn fr">
          <router-link :to="{name: 'list', params: {name: 'myTasteList'}}">更多</router-link>
        </div>
      </div>
      <div class="content">
        <div class="item" v-for="item in limitMyTaste">
          <router-link :to="{name: 'tasteDetails', params: { id: item.id }}">
            <div class="item-face img-width">
              <img src="/static/temp/item-face.jpg" alt="item.title">
            </div>
            <div class="title">
              {{ item.title }}
            </div>
            <!--<div class="text">
              {{item.content}}
            </div>-->
          </router-link>
        </div>
      </div>
    </div>

    <div class="module my-report">
      <div class="module-head clearfix">
        <h2 class="fl">我的体验报告</h2>
        <div class="more-btn fr">
          <router-link :to="{name: 'list', params: {name: 'myReportList'}}">更多</router-link>
        </div>
      </div>
      <div class="content">
        <div class="item" v-for="item in limitMyReport">
          <router-link :to="{name: 'myReport', params: {id: item.id}}">
            <div class="item-face img-width">
              <img src="/static/temp/item-face.jpg" :alt="item.title">
            </div>
            <div class="title">
              {{ item.title }}
            </div>
            <!--<div class="text">
              我是一段文本我也是一段文本
            </div>-->
          </router-link>
        </div>
      </div>
    </div>

    <div class="module my-cash-record">
      <div class="module-head clearfix">
        <h2 class="fl">我的兑换记录</h2>
        <div class="more-btn fr">
          <router-link :to="{name: 'list', params: {name: 'myCashList'}}">更多</router-link>
        </div>
      </div>
      <div class="content">
        <div class="item" v-for="item in limitMyCash">
          <div class="item-face img-width">
            <img src="/static/temp/item-face.jpg" :alt="item.title">
          </div>
          <div class="title">
            {{ item.title }}
          </div>
          <!--<div class="text">
            我是一段文本我也是一段文本
          </div>-->
        </div>
      </div>
    </div>
    <v-nav :name="name"></v-nav>
  </section>
</template>

<script type="text/ecmascript-6">
  import VNav from '@/components/nav/nav'
  export default{
    components: {VNav},
    name: 'profileIndex',
    data () {
      return {
        name: 'profile'
      }
    },
    props: {
      userInfo: {
        type: Object
      }
    },
    computed: {
      limitMyTaste () {
        return this.userInfo.myTasteList.slice(0, 2)
      },
      limitMyReport () {
        return this.userInfo.myReportList.slice(0, 2)
      },
      limitMyCash () {
        return this.userInfo.cashRecordList.slice(0, 2)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .profile
    padding-bottom: 40px
    .head
      height: 115px
      padding: 15px 0 0 0
      margin-bottom: 10px
      position: relative
      background: url("profile-head-bg.jpg") no-repeat center top
      background-size: 100% auto
      text-align: center
      color: #fff
      .avatar
        width: 50px
        height: 50px
        overflow: hidden
        border-radius: 50%
        margin: 0 auto
      .nick
        margin:4px auto
      .points
        font-size: 12px
      a
        position: absolute
        top: 15px
        right: 15px
    .module
      padding: 10px 20px 15px 20px
      margin-bottom: 10px
      background: #fff
      .module-head
        padding: 10px 0
        font-size: 16px
      .content
        display: flex
        justify-content: space-between
        .item
          width: 48%
          padding: 5px
          background: #eee
          .title
            margin: 8px 0
            font-weight: bold
          .text
            color: #666
            line-height: 1.2

</style>
