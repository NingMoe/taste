<template>
  <section class="myList" v-if="appData">
    <h1 class="common-head">
      <a href="javascript:history.back()"><img src="../../../common/arrow-left.png" alt=""></a>
      {{listData.title}}
    </h1>
    <ul>
      <li v-for="item in listData.data" @click="toDetails(item.id, item.activityid, item.status)">
        <div class="item-face img-width">
          <img :src="item.imgsrc||item.imgsrcmedium">
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
      }
    },
    data () {
      return {}
    },
    computed: {
      listData () {
        let name = this.$route.params.name
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
        return maps[name]
      }
    },
    components: {
      statusTag
    },
    methods: {
      toDetails (id, activityid, status) {
        if (this.$route.params.name === 'myCashRecord') {
          return
        } else if (this.$route.params.name === 'myReportList') {
          this.$router.push({name: 'myReport', params: {id: id, activityid: activityid, status: status}})
        } else {
          this.$router.push({name: 'activityDetail', params: {id: id}})
        }
      },
      getStatus (item) {
        let now = Date.parse(this.appData.nowDate)

        if (this.$route.params.name === 'myActivityList') {
          if (item.ischeck === '2') {
            return 2
          } else {
            // let beginTime = Date.parse(item.begintime)
            let endTime = Date.parse(item.endtime)
            // let enrollBeginTime = Date.parse(item.enrollbegintime)
            // let enrollEndTime = Date.parse(item.enrollendtime)
            // let reportBeginTime = Date.parse(item.reportbegintime)
            // let reportEndTime = Date.parse(item.reportendtime)
            if (endTime > now) {
              return 1
            } else if (endTime < now) {
              return 3
            }
          }
        } else {
          return item.status
        }
      }
    },
    mounted () {}
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
