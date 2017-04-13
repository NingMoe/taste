<template>
  <section class="home">
    <header class="head">
      <h1>所有体验</h1>
      <swipe class="my-swipe" :auto="5000" :speed="500">
        <swipe-item class="slide1"><img src="../../../../static/images/yuantiao.jpg" alt=""></swipe-item>
        <swipe-item class="slide2"><img src="../../../../static/images/muwu.jpg" alt=""></swipe-item>
        <swipe-item class="slide3"><img src="../../../../static/images/shuijiao.jpg" alt=""></swipe-item>
      </swipe>
    </header>
    <div class="text-center" v-if="!tasteList">没有查找到相关数据</div>
    <ul class="taste-list">
      <li v-for="taste in tasteList" @click="toDetails(taste.id)">
        <div class="taste-face">
          <img src="./item-face.jpg" alt="">
          <div class="time-sign"> {{ taste.timeOut }} </div>
        </div>
        <div class="content">
          <h2>{{ taste.title }}</h2>
          <!--<p>{{ taste.description }}</p>-->
        </div>
      </li>
    </ul>
    <v-nav :name="name"></v-nav>
  </section>

</template>

<script type="text/ecmascript-6">
  import vNav from '@/components/nav/nav'

  export default{
    name: 'homeIndex',
    data () {
      return {
        name: 'home'
      }
    },
    props: {
      tasteList: {
        type: Array
      }
    },
    methods: {
      toDetails (id) {
        this.$router.push({name: 'tasteDetails', params: { id: id }})
      }
    },
    components: { vNav }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '/static/vue-swipe.css'

  .home
    padding-bottom: 40px
    .head
      padding:20px
      h1
        margin-bottom: 10px
        font-size: 16px
      .banner
        width: 100%
        height: 120px
        margin-top 8px
        background: #ccc
        overflow: hidden
        img
          width: 100%
    .taste-list li
      margin-bottom: 10px
      padding:15px 20px
      background: #ffffff
      .taste-face
        margin-bottom: 10px
        position: relative
        .time-sign
          position: absolute
          top: -1px
          left: 1.2em
          color: #fff
          height: 2.4em
          line-height: 2.4
          padding: 0 10px
          background: #fabe00
          font-size: 10px
          text-align: center
        .time-sign:before
          content: ''
          display: block
          width: 0
          height: 0
          position: absolute
          left:-1.2em
          border-top: 0.6em solid #fabe00
          border-right: 0.6em solid #fabe00
          border-left: 0.6em solid transparent
          border-bottom: 0.6em solid transparent
        .time-sign:after
          content: ''
          display: block
          width: 0
          height: 0
          position: absolute
          left: -1.2em
          bottom: 0
          border-top: 0.6em solid transparent
          border-right: 0.6em solid #fabe00
          border-left: 0.6em solid transparent
          border-bottom: 0.6em solid #fabe00
      .content
        h2
          font-size: 16px
          margin-bottom: 6px
        p
          line-height: 1.2
          padding-bottom: 10px
          border-bottom: 2px solid #eb191a
      img
        width: 100%
  .my-swipe
    height: 186px
    color: #fff
    font-size: 30px
    text-align: center
    img
      width: 100%

</style>
