<template>
  <article class="tasteDetails">
    <h1>{{ tasteData.title }}</h1>
    <div class="info">{{ tasteData.author }}  {{ tasteData.addTime }}</div>
    <div class="content" v-html="tasteData.content"></div>
    <div class="rules">
      <header><img src="./rules-title.png" alt=""></header>
      <div class="rules-content">{{ tasteData.rules }}</div>
    </div>

    <div class="task" v-if="tasteData.taskList">
      <h2>体验任务 <span>查看并分享下方文章给好友就能获得积分噢~</span></h2>
      <ul>
        <li v-for="item in tasteData.taskList">
          <router-link :to="{name: 'tasteDetails', params: {id: item.id, scroll: 20}}">
            <div class="task-item-face img-width">
              <img src="/static/temp/item-face.jpg" alt="">
            </div>
            <div class="content">
              <div class="title">{{item.title}}</div>
              <!--<div class="desc">{{item.desc}}</div>-->
              <span class="points">{{ item.points }}积分</span>
              <div class="task-btn bg-blue" v-if="item.status===1">已完成</div>
              <div class="task-btn bg-red" v-else="item.status===0">未完成</div>
            </div>
          </router-link>
        </li>
      </ul>
    </div>

    <div class="reg-info">
      <h2>报名信息</h2>
      <ul>
        <li>姓　　名: {{tasteData.name}}</li>
        <li>联系方式: {{tasteData.phone}}</li>
        <li>参加人数: {{tasteData.nums}}</li>
        <li>是否驾车: {{tasteData.useCar?'是':'否'}}</li>
      </ul>
    </div>

    <div class="tasteDetails-btns common-bottom-btns">
      <div class="join-btn"><router-link :to="{name: 'tasteRegister', params: {tasteData: tasteData, id: $route.params.id}}">立即参加</router-link></div>
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
    padding: 12px 12px 50px 12px
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
      margin: 25px 5px 25px 0
      padding: 10px 10px 10px 20px
      position: relative
      line-height: 1.4
      border: 1px solid #fabe00
      header img
        width: 90px
        height: auto
      .rules-content
        margin: 15px 0
    .rules:after
      content: ''
      display: block
      height: 100%
      width: 100%
      position: absolute
      left: 5px
      bottom: 5px
      border: 1px solid #fabe00
    .tasteDetails-btns
      .join-btn
        width: 75%
        height: 40px
        text-align: center
        a
          display: block
      .back-btn
        width: 25%
        height: 36px
        position: absolute
        top: 2px
        right: 2px
        line-height: 36px
        color: #333
        background: #fff
    .task
      & span
        font-size: 12px
      ul li
        margin-bottom: 10px
      ul li a
        display: flex
      .content
          flex: 1
          padding-left: 8px
          position: relative
        .task-item-face
          width: 38%
        .desc
          font-size: 12px
          color: #999
        .points
          position: absolute
          left: 8px
          bottom: 0
        .task-btn
          padding: 4px 8px
          position: absolute
          right: 0
          bottom: 0
          font-size: 12px
          color: #fff
    .task h2,.reg-info h2
      margin-bottom:15px
      font-size: 18px
      font-weight: bold
    .reg-info
      margin-top: 25px
      li
        margin: 8px 0
</style>
