<template>
  <section class="myReport" v-if="questions.length>0">
    <h1 class="common-head">填写体验报告</h1>
    <ul class="question-list">
      <li v-for="(item,index) in questions">
        <h3>{{index+1}}. {{item.question}}</h3>
        <div class="input-container" v-if="item.type == 1"><input type="text"></div>
        <div class="options" v-else="item.type==2">
          <div class="option" v-for="option in item.options">
            <input type="radio">
            {{option}}
          </div>
        </div>
      </li>
    </ul>

    <div class="suggest">
      <h3>请留下您对这次体验的意见或建议</h3>
      <textarea name="suggest" placeholder="请填写您的意见或建议，不超过500字"></textarea>
      <div>0/500</div>
    </div>

    <div class="common-bottom-btns">
      <div class="submit-btn">提交答案</div>
      <div class="back-btn">返回</div>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">

  export default{
    name: 'myReport',
    data () {
      return {
        questions: []
      }
    },
    mounted () {
      this.$http.get('/api/getQuestionById').then(res => {
        this.questions = res.body
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .myReport
    padding-bottom: 40px
    background: #fff
    .question-list
      padding: 15px
    .suggest
      padding: 15px
      textarea[name=suggest]
        width: 100%
        height: 6em
        margin-top: 10px
        resize: none
</style>
