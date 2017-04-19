<template>
  <section class="mall">
    <h1 class="common-head">积分商城</h1>
    <div class="welcome" v-if="userInfo">
      {{userInfo.nick}}，积分商城欢迎您，您的剩余积分为：{{userInfo.score}}
    </div>
    <div class="text-center" v-if="!goodsList">没有查找到相关数据</div>
    <ul class="goods-list">
      <li v-for="goods in goodsList" @click="toDetails(goods.id)">
        <div class="goods-face">
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
      }
    },
    mounted () {
      this.$nextTick(() => {
        window.wxConfig()
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

  .mall
    padding-bottom: 40px
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
        width: 48%
        padding: 10px 0 30px 0
        margin-bottom: 15px
        position: relative
        background: #fff
        img
          width: 100%
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
