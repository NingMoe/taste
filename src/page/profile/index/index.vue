<template>
  <section class="profile" v-if="appData.userInfo">
    <header class="head">
      <div class="avatar img-width">
        <img :src="appData.userInfo.headimg" alt="">
      </div>
      <div class="nick">{{ appData.userInfo.nick }}</div>
      <div class="points">
        剩余积分: {{ appData.userInfo.score }}
      </div>
      <router-link to="profile/personal">账户管理 ></router-link>
    </header>

    <div class="module my-taste">
      <div class="module-head clearfix">
        <h2 class="fl">我的体验</h2>
        <div class="more-btn fr">
          <router-link :to="{name: 'list', params: {name: 'myActivityList'}}">更多</router-link>
        </div>
      </div>
      <div class="content"  v-if="appData.myActivityList.length>0">
        <template v-for="item in limitMyTaste">
          <router-link :to="{name: 'activityDetail', params: { id: item.id }}" class="item" >
            <div class="item-face img-width">
              <img :src="item.imgsrc" alt="item.title">
            </div>
            <div class="title">
              {{ item.name }}
            </div>
            <status-tag :status="getStatus(item, 'myActivityList')" :type="'myActivityList'"></status-tag>
          </router-link>
        </template>
      </div>
      <div class="nodata" v-else>暂时没有数据</div>
    </div>

    <div class="module my-report">
      <div class="module-head clearfix">
        <h2 class="fl">我的体验报告</h2>
        <div class="more-btn fr">
          <router-link :to="{name: 'list', params: {name: 'myReportList'}}">更多</router-link>
        </div>
      </div>
      <div class="content" v-if="appData.myReportList.length>0">
        <template v-for="item in limitMyReport">
          <router-link :to="{name: 'myReport', params: {id: item.activityid}}" class="item">
            <div class="item-face img-width">
              <img :src="item.imgsrc" :alt="item.title">
            </div>
            <div class="title">
              {{ item.name }}
            </div>
            <status-tag :status="getStatus(item, 'myReportList')" :type="'myReportList'"></status-tag>
          </router-link>
        </template>
      </div>
      <div class="nodata" v-else>暂时没有数据</div>
    </div>

    <div class="module my-cash-record">
      <div class="module-head clearfix">
        <h2 class="fl">我的兑换记录</h2>
        <div class="more-btn fr">
          <router-link :to="{name: 'list', params: {name: 'myCashRecord'}}">更多</router-link>
        </div>
      </div>
      <div class="content" v-if="appData.myCashRecord.length>0">
        <div class="item" v-for="item in limitMyCash">
          <div class="item-face img-width">
            <img :src="item.imgsrcmedium" :alt="item.title">
          </div>
          <div class="title">
            {{ item.goodsname }}
          </div>
        </div>
      </div>
      <div class="nodata" v-else>暂时没有数据</div>
    </div>
    <v-nav :name="name"></v-nav>
  </section>
</template>

<script type="text/ecmascript-6">
  import vNav from '@/components/nav/nav'
  import statusTag from '@/components/statusTag/statusTag'

  export default{
    components: {vNav, statusTag},
    name: 'profileIndex',
    data () {
      return {
        name: 'profile'
      }
    },
    props: {
      appData: {
        type: Object
      }
    },
    computed: {
      limitMyTaste () {
        return this.appData.myActivityList.slice(0, 2)
      },
      limitMyReport () {
        return this.appData.myReportList.slice(0, 2)
      },
      limitMyCash () {
        return this.appData.myCashRecord.slice(0, 2)
      }
    },
    methods: {
      getStatus (item, name) {
        let now = Date.parse(this.appData.nowDate)
        let endTime = Date.parse(item.endtime)
        if (name === 'myActivityList') {
          if (now > endTime) {
            return 3
          } else {
            return item.enrollstatus
          }
        } else if (name === 'myReportList') {
          if (now > endTime) {
            if (item.reportstatus === 2 || item.reportstatus === 3) {
              return item.reportstatus
            } else {
              return 4
            }
          } else {
            return item.reportstatus
          }
        }
      }
    },
    mounted () {
      window.wxConfig()
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
      .nodata
        text-align: center
        padding: 14px 0
      .content
        display: flex
        justify-content: space-between
        .item
          width: 48%
          padding: 5px
          position: relative
          background: #eee
          display: flex
          flex-direction: column
          justify-content: space-between
        .title
          margin: 8px 0
          font-weight: bold
        .text
          color: #666
          line-height: 1.2
</style>
