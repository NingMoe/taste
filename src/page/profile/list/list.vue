<template>
  <section class="myList" v-if="userInfo">
    <h1>
      <router-link to="/profile"><img src="../../../common/arrow-left.png" alt=""></router-link>
      我的体验
    </h1>
    <ul>
      <li v-for="item in list" @click="toDetails(item.status,item.id)">
        <div class="item-face img-width">
          <img src="/static/temp/item-face.jpg" :alt="item.title">
        </div>
        <div class="title">
          {{item.title}}
        </div>
        <status-tag :status="item.status" :type="$route.params.name"></status-tag>
      </li>
    </ul>
  </section>
</template>

<script type="text/ecmascript-6">
  import statusTag from '@/components/statusTag/statusTag'

  export default{
    name: 'list',
    props: {
      userInfo: {
        type: Object
      }
    },
    data () {
      return {}
    },
    computed: {
      list () {
        let name = this.$route.params.name
        let maps = {
          'taste': this.userInfo.myTasteList,
          'report': this.userInfo.myReportList,
          'cash': this.userInfo.cashRecordList
        }
        return maps[name]
      }

    },
    components: {
      statusTag
    },
    methods: {
      toDetails (status, id) {
        if (status === 1) {
          this.$router.push({name: 'tasteDetails', params: {id: id}})
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

  .myList
    background: #fff
    min-height: 530px
    h1
      height: 40px
      line-height: 40px
      position: relative
      color: #fff
      background: #eb191a
      text-align: center
      a
        display: block
        width: 44px
        position: absolute
        top: 0
        left: 0
        bottom: 0
        img
          height: 20px
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
