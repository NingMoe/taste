<template>
  <section class="myList" v-if="appData">
    <h1 class="common-head">
      <a href="javascript:history.back()"><img src="../../../common/images/arrow-left.png" alt=""></a>
      {{listData.title}}
    </h1>
    <ul>
      <li v-for="item in listData.data" @click="toDetails(item.id, item.activityid, item.status)">
        <div class="item-face img-width">
          <img :src="item.imgsrcmedium||item.imgsrc">
        </div>
        <div class="title">
          {{item.name||item.goodsname}}
        </div>
        <status-tag :status="getStatus(item)" :type="$route.params.name"></status-tag>
      </li>
    </ul>
  </section>
</template>

<script type="text/ecmascript-6">
  import statusTag from '@/components/statusTag/statusTag'

  export default{
    name: 'list',
    props: {
      appData: {
        type: Object
      },
      pageSize: {
        type: Object
      }
    },
    data () {
      return {
        pageName: this.$route.params.name
      }
    },
    computed: {
      listData () {
        let maps = {
          myActivityList: {
            data: this.appData.myActivityList,
            title: '我的体验列表'
          },
          myReportList: {
            data: this.appData.myReportList,
            title: '我的体验报告'
          },
          myCashRecord: {
            data: this.appData.myCashRecord,
            title: '我的兑换记录'
          }
        }
        return maps[this.pageName]
      }
    },
    components: {
      statusTag
    },
    methods: {
      toDetails (id, activityid, status) {
        if (this.pageName === 'myCashRecord') {
          return
        } else if (this.pageName === 'myReportList') {
          this.$router.push({name: 'myReport', params: {id: id, activityid: activityid, status: status}})
        } else {
          this.$router.push({name: 'activityDetail', params: {id: id}})
        }
      },
      getStatus (item) {
        let now = Date.parse(this.appData.nowDate)
        let endTime = Date.parse(item.endtime)
        if (this.pageName === 'myActivityList') {
          if (now > endTime) {
            return 3
          } else {
            return item.enrollstatus
          }
        } else if (this.pageName === 'myReportList') {
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
      },
      scroll () {
        let docHeight = document.body.clientHeight
        let docScrollTop = document.body.scrollTop
        let viewHeight = document.documentElement.clientHeight
        if (docHeight - viewHeight <= docScrollTop) {
          document.removeEventListener('scroll', this.scroll)
          this.loadMore()
        }
      },
      loadMore () {
        if (this.pageSize[this.pageName] < 0) {
          return
        }
        this.$http.get('/web/' + this.pageName, {params: {page: this.pageSize[this.pageName]}}).then(res => {
          if (res.body === '0') {
            this.pageSize[this.pageName] = -1
          } else {
            for (let o in res.body) {
              this.appData[this.pageName].push(res.body[o])
            }
            if (res.body.length >= 20) {
              this.pageSize[this.pageName]++
              document.addEventListener('scroll', this.scroll)
            } else {
              this.pageSize[this.pageName] = -1
            }
          }
        })
      }
    },
    mounted () {
      window.wxConfig()
      if (this.pageSize[this.pageName] > 0) {
        console.log('bind')
        document.addEventListener('scroll', this.scroll)
      }
    },
    destroyed () {
      document.removeEventListener('scroll', this.scroll)
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

  .myList
    background: #fff
    min-height: 100vh
    ul
      display: flex
      padding: 20px 15px
      flex-wrap: wrap
      justify-content: space-between
      li
        display: flex
        flex-direction: column
        justify-content: space-between
        background: #eee
        width: 48%
        padding: 5px
        margin-bottom: 15px
        position: relative
        .title
          margin-top: 8px
          line-height: 1.2
          font-weight: bold
</style>
