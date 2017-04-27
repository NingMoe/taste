<template>
  <section class="global-ad">
    <h1 class="common-head">
      文章详情
      <div class="back-btn" @click="back"><img src="../../../common/images/arrow-left.png" alt=""></div>
    </h1>
    <div class="content" v-html="adData.content"></div>
  </section>
</template>

<script type="text/ecmascript-6">
  export default{
    name: 'ad',
    data () {
      return {
        adData: {}
      }
    },
    methods: {
      back () {
        history.back()
      }
    },
    mounted () {
      this.$http.get('/web/getAdvertInnerById', {params: {id: this.$route.params.id}}).then(res => {
        this.adData = res.body
      })
      window.wxConfig(window.location.href)
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .global-ad
    min-height: 100vh
    background: #fff
    .content
      padding: 14px
      line-height: 1.3
      img
        max-width: 100%
</style>
