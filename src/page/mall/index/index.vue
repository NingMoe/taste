<template>
  <section class="mall">
    <h1 class="common-head">积分商城</h1>
    <div class="welcome" v-if="userInfo">
      {{userInfo.nick}}，积分商城欢迎您，您的剩余积分为：{{userInfo.score}}
    </div>
    <div class="text-center nodata" v-if="!goodsList">没有查找到相关数据</div>
    <ul class="goods-list">
      <li v-for="goods in goodsList" @click="toDetails(goods.id)">
        <div class="goods-face img-width">
          <img :src="goods.imgsrcmedium" :alt="goods.goodsname">
        </div>
        <div class="title">{{ goods.goodsname }}</div>
        <span class="points">{{ goods.score }}积分</span>
        <span class="cash-btn">兑换</span>
      </li>
    </ul>
    <v-nav :name="name"></v-nav>
  </section>
</template>

<script type="text/ecmascript-6">
  import vNav from '@/components/nav/nav'

  export default{
    name: 'mallIndex',
    props: {
      goodsList: {
        type: Array
      },
      userInfo: {
        type: Object
      },
      pageSize: {
        type: Object
      }
    },
    data () {
      return {
        name: 'mall'
      }
    },
    components: { vNav },
    methods: {
      toDetails (id) {
        this.$router.push({name: 'goodsDetail', params: {id: id}})
      },
      toCash (id) {
        alert(id)
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
        if (this.pageSize.goods < 0) {
          return
        }
        this.$http.get('/web/getGoodsList', {params: {page: this.pageSize.goods}}).then(res => {
          if (res.body === '0') {
            this.pageSize.goods = -1
          } else {
            for (let o in res.body) {
              this.goodsList.push(res.body[o])
            }
            if (res.body.length >= 20) {
              this.pageSize.goods++
              document.addEventListener('scroll', this.scroll)
            } else {
              this.pageSize.goods = -1
            }
          }
        })
      }
    },
    mounted () {
      window.wxConfig()
      if (this.pageSize.goods > 0) {
        document.addEventListener('scroll', this.scroll)
      }
    },
    destroyed () {
      document.removeEventListener('scroll', this.scroll)
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

  .mall
    padding-bottom: 40px
    .nodata
      margin-top: 30px
    .welcome
      background: #fff
      padding: 12px
      line-height: 1.2
      text-align: center
    & > ul
      display: flex
      flex-wrap: wrap
      justify-content: space-between
      padding: 10px 15px
      li
        display: flex
        flex-direction: column
        justify-content: space-between
        width: 48%
        padding: 10px 0 30px 0
        margin-bottom: 15px
        position: relative
        background: #fff
        .goods-face
          overflow: hidden
        .title
          margin-top: 8px
          line-height: 1.2
        .points,.cash-btn
          position: absolute
          bottom: 0
          color: #fff
          font-size: 12px
        .points
          left: 0
          background: #fabe00
          padding: 6px 5px
        .cash-btn
          right: 0
          background: #eb191a
          padding: 6px 1em
        .points:before
          content: ''
          display: block
          width: 0
          height: 0
          position: absolute
          right:-1.15em
          top: 0
          border-top: 0.6em solid #fabe00
          border-right: 0.6em solid transparent
          border-left: 0.6em solid #fabe00
          border-bottom: 0.6em solid transparent
        .points:after
          content: ''
          display: block
          width: 0
          height: 0
          position: absolute
          right: -1.15em
          bottom: 0
          border-top: 0.6em solid transparent
          border-right: 0.6em solid transparent
          border-left: 0.6em solid #fabe00
          border-bottom: 0.6em solid #fabe00


</style>
