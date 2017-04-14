<template>
  <article class="goodsDetails">
    <header class="head">
      <h1 class="common-head">商品详情</h1>
      <div class="carousel">
        <img src="../index/goods-item.jpg" :alt="goodsData.title">
      </div>
      <div>{{ goodsData.title }}</div>
    </header>
    <div class="points">
      兑换积分: {{ goodsData.points }}
    </div>
    <div class="address">
      兑换地址: {{ goodsData.address }}
    </div>
    <div class="description">
      <h2>商品描述:</h2>
      <div>
        {{ goodsData.description }}
      </div>
    </div>
    <div class="goodsDetails-btns common-bottom-btns">
      <div class="cash-btn btn">立即兑换</div>
      <div class="back-btn btn" @click="back">返回</div>
    </div>
  </article>
</template>

<script type="text/ecmascript-6">
  export default{
    name: 'goodsDetails',
    data () {
      return {
        goodsData: {}
      }
    },
    mounted () {
      this.$http.get('/static/mock/goods.json', { id: this.$route.params.id }).then((res) => {
        this.goodsData = res.body
      })
    },
    methods: {
      back () {
        history.back()
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .goodsDetails
    .head
      background: #fff
      text-align: center
      padding-bottom: 10px
      .carousel
        height: 120px
        margin: 10px auto
        img
          height: 100%
    .points,.address,.description
      margin-top: 10px
      padding: 8px 10px
      line-height: 1.2
      background: #fff
    .description h2
      font-size: 16px
      margin-bottom: 10px

</style>
