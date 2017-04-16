<template>
  <section class="notFound">
    <h1 class="common-head">找不到页面了...</h1>
    <div class="content">
      <img src="./404.jpg" alt="">
      <div class="back-btn" @click="toHome">返回首页</div>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
  export default{
    name: 'notFound',
    methods: {
      toHome () {
        this.$router.replace({path: '/home'})
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .notFound
    background: #f7f7f9
    min-height: 100vh
    .content
      width: 60%
      margin: 0 auto
    .content img
      width: 100%
      padding-top: 120px
    .back-btn
      width: 100%
      height: 40px
      background: #fff
      box-shadow: 2px 2px 3px rgba(0,0,0,0.1)
      margin-top: 20px
      line-height:40px
      border: 1px solid #960114
      color: #960114
      text-align: center
      border-radius: 15px

</style>
