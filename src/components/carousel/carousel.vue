<template>
  <swipe class="my-swipe" :auto="0" :speed="500">
    <swipe-item class="slide1"><img src="../../../static/images/yuantiao.jpg" alt=""></swipe-item>
    <swipe-item class="slide2"><img src="../../../static/images/muwu.jpg" alt=""></swipe-item>
    <swipe-item class="slide3"><img src="../../../static/images/shuijiao.jpg" alt=""></swipe-item>
  </swipe>
</template>

<script>
  export default{
    name: 'carousel',
    props: {
      auto: Number
    },
    mounted () {}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .my-swipe
    height: 186px
    color: #fff
    font-size: 30px
    text-align: center
    overflow: hidden
    img
      width: 100%
    .slide1
      background-color: #0089dc
      color: #fff
    .slide2
      background-color: #ffd705
      color: #000
    .slide3
      background-color: #ff2d4b
      color: #fff
</style>
