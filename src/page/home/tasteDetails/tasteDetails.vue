<template>
  <article class="tasteDetails">
    <h1>{{ tasteData.title }}</h1>
    <div class="info">{{ tasteData.author }}  {{ tasteData.addTime }}</div>
    <div class="content" v-html="tasteData.content"></div>
    <div class="rules">
      <header><img src="./rules-title.png" alt=""></header>
      <div class="rules-content">{{ tasteData.rules }}</div>
    </div>

    <div class="task">
      <h2>体验任务 <span>查看并分享下方文章给好友就能获得积分噢~</span></h2>
      <ul>
        <li>
          <div class="task-item-face">
            <img src="/static/temp/item-face.jpg" alt="">
          </div>
        </li>
      </ul>
    </div>

    <div class="tasteDetails-btns">
      <div class="join-btn">立即参加</div>
      <div class="back-btn" @click="back">返回</div>
    </div>
  </article>
</template>

<script type="text/ecmascript-6">
  export default{
    name: 'tasteDetails',
    data () {
      return {
        tasteData: {}
      }
    },
    mounted () {
      this.$http.get('/api/getTasteById', {id: this.$route.params.id}).then((res) => {
        this.tasteData = res.body
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

  .tasteDetails
    padding: 12px 12px 40px 12px
    background: #fff
    h1
      font-size: 18px
      line-height: 1.3
    .info
      margin: 8px 0 15px 0
    .content
      line-height: 1.4
      img
        max-width: 100%
    .rules
      margin: 20px 5px 10px 0
      padding: 10px
      position: relative
      line-height: 1.4
      border: 1px solid #fabe00
      header img
        width: 80px
        height: auto
      .rules-content
        margin: 15px 0
    .rules:before
      content: ''
      display: block
      height: 0
      width: 100%
      position: absolute
      left: 5px
      top: -5px
      border-top: 1px solid #fabe00
    .rules:after
      content: ''
      display: block
      height: 0
      width: 100%
      position: absolute
      left: 5px
      bottom: 5px
      border-top: 1px solid #fabe00
    .tasteDetails-btns
      position: fixed
      bottom: 0
      left: 0
      right: 0
      height: 40px
      background: #eb191a
      .join-btn
        width: 75%
        height: 40px
        line-height: 40px
        text-align: center
        color: #fff
      .back-btn
        width: 25%
        height: 36px
        position: absolute
        top: 2px
        right: 2px
        text-align: center
        line-height: 36px
        background: #fff
</style>
