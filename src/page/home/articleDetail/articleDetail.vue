<template>
  <article class="articleDetails">
    <h1>{{articleData.title}}</h1>
    <div class="info">{{ articleData.username }}  {{ articleData.addtime }}</div>
    <div class="content" v-html="articleData.content"></div>
    <div class="common-bottom-btns">
      <div class="btn" @click="showShare">
        立即分享
      </div>
      <div class="back-btn btn" @click="back">返回</div>
    </div>
    <div class="share-lock" v-show="shareLockShow" @click="hideShare"><img src="../../../common/share.png" alt=""></div>
  </article>
</template>

<script type="text/ecmascript-6">
  export default{
    name: 'articleDetails',
    data () {
      return {
        articleData: {},
        shareLockShow: false
      }
    },
    mounted () {
      // this.$http.get('/web/articleDetail').then(res => {
      this.$http.get('/web/getArticleDetail', {params: {id: this.$route.params.id}}).then(res => {
        this.articleData = res.body
        window.wxConfig(window.location.href, res.body.title, null, () => {
          this.$http.get('/web/doTask', {params: {id: this.$route.params.id}}).then(data => {
            if (data.body === 'success') {
              alert('分享成功')
            } else if (data.body !== '3') {
              alert('分享失败, 详情请咨询' + window.commonPhone)
            }
          })
        })
      })
    },
    methods: {
      back () {
        history.back()
      },
      showShare () {
        this.shareLockShow = true
      },
      hideShare () {
        this.shareLockShow = false
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .articleDetails
    min-height: 90vh
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
    .share-lock
      position: fixed
      top: 0
      left: 0
      right: 0
      bottom: 0
      img
        width: 100%
        height: 100%
</style>
