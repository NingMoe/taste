<template>
  <section class="face">
    <header class="head">
      <h1>所有体验</h1>
      <div class="banner">
        <img src="./banner.jpg" alt="">
      </div>
    </header>
    <ul class="taste-list" v-for="taste in tasteList">
      <li>
        <div class="item-face">
          <img src="./item-face.jpg" alt="">
          <div class="time-sign"> {{ taste.timeOut }} </div>
        </div>
        <div class="content">
          <h2>{{ taste.title }}</h2>
          <p>{{ taste.description }}</p>
        </div>
      </li>
    </ul>
  </section>
</template>

<script type="text/ecmascript-6">
  export default{
    name: 'face',
    props: {
      tasteList: {
        type: Array
      }
    }

  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

  .face
    padding-bottom: 40px
    .head
      padding:20px
    .banner
      width: 100%
      height: 120px
      margin-top 8px
      background: #ccc
      overflow: hidden
      img
        width: 100%
    h1
      font-size: 16px
    .taste-list li
      margin-bottom: 10px
      padding:15px 20px
      background: #ffffff
      .item-face
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
