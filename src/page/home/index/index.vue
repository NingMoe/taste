<template>
  <section class="home">
    <header class="head">
      <h1>所有体验</h1>
      <swipe class="home-swipe" :auto="5000" :speed="300">
        <swipe-item v-for="item in carousels" :key="item.id">
          <a :href="item.href">
            <img :src="item.img" alt="">
          </a>
        </swipe-item>
      </swipe>
    </header>
    <div class="text-center" v-if="!tasteList">没有查找到相关数据</div>
    <ul class="taste-list">
      <li v-for="taste in tasteList" @click="toDetails(taste.id)">
        <div class="taste-face">
          <img :src="taste.imgsrc" alt="">
          <div class="time-sign"> {{ taste.timeOut }}后结束 </div>
        </div>
        <div class="content">
          <h2>{{ taste.name }}</h2>
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
      },
      carousels: {
        type: Array
      }
    },
    methods: {
      toDetails (id) {
        this.$router.push({name: 'activityDetail', params: { id: id }})
      }
    },
    components: { vNav },
    mounted () {}
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
      .home-swipe
        height: 186px
        color: #fff
        font-size: 30px
        text-align: center
      .home-swipe img
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


</style>
