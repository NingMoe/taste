<template>
  <section class="myReportResult" v-if="answers.length>0">
    <h1 class="common-head">
      我的体验报告
      <div class="back-btn" @click="back"><img src="../../../common/arrow-left.png" alt=""></div>
    </h1>
    <ul class="answer-list">
      <li class="question-item" v-for="(item, index) in answers">
        <h3>{{index+1}}. {{item.question}}</h3>
        <div class="answer">{{item.answer}}</div>
      </li>
    </ul>
    <div class="suggest">
      <h3>您的建议 :</h3>
      <div class="text">{{suggest}}</div>
    </div>
  </section>
  <section class="myReport" v-else>
    <h1 class="common-head">
      填写体验报告
      <div class="back-btn" @click="back"><img src="../../../common/arrow-left.png" alt=""></div>
    </h1>
    <ul class="question-list">
      <li class="question-item" v-for="(item, index) in questions">
        <h3>{{index+1}}. {{item.question}}</h3>
        <div class="input-container" v-if="item.questiontype == 0">
          <input type="text" :name="'input-'+item.id" class="input" v-validate="'required'" v-model="para.answerinfo[index].answer">
          <span v-show="errors.has('input-'+item.id)" class="is-danger">* 必填</span>
        </div>
        <template v-else="item.questiontype==1">
          <div class="option" v-for="(option, ind) in item.options">
            <input type="radio" v-validate="'required'" :id="'radio'+item.id+ind" :name="'input-'+item.id" :value="option.id" class="radio" v-model="para.answerinfo[index].answer">
            <label :for="'radio'+item.id+ind">{{option.option}}</label>
          </div>
          <span v-show="errors.has('input-'+item.id)" class="is-danger">请选择</span>
        </template>
      </li>
    </ul>
    <div class="suggest">
      <h3>请留下您对这次体验的意见或建议</h3>
      <textarea name="suggest" v-model="para.suggest" maxlength="500" placeholder="请填写您的意见或建议，不超过500字"></textarea>
      <div class="counts">{{para.suggest.length}}/500</div>
    </div>

    <div class="common-bottom-btns">
      <div class="submit-btn" @click="submit">提交答案</div>
      <div class="back-btn">返回</div>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
  export default{
    name: 'myReport',
    data () {
      return {
        questions: [],
        answers: [],
        para: {
          activityid: this.$route.params.id,
          answerinfo: [],
          suggest: ''
        },
        suggest: ''
      }
    },
    mounted () {
      // this.$http.get('/static/mock/question.json').then(res => {
      this.$http.get('/web/myReportDetail', {params: {id: this.$route.params.id}}).then(res => {
        this.answers = res.body.reportList
        this.suggest = res.body.suggest
        return this.$http.get('/web/getQuestionList', {params: {id: this.$route.params.id}})
      }).then(res => {
        this.questions = res.body.questions
        for (let o in this.questions) {
          this.para.answerinfo.push({question: this.questions[o].id, answer: ''})
        }
      })
    },
    methods: {
      back () {
        history.back()
      },
      submit () {
        this.$validator.validateAll().then(() => {
          this.$http.post('/web/postReport', {params: this.para}).then(res => {
            if (res.body === 'success') {
              alert('提交成功!')
            } else {
              alert('提交失败')
            }
          })
        }).catch(() => {})
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .myReport
    min-height: 100vh
    padding-bottom: 40px
    background: #fff
    .question-list
      padding:15px 15px 0 15px
      .question-item
        position: relative
        margin: 5px 0 22px 0
        .is-danger
          position:absolute
          bottom: -14px
          left: 16px
          color: red
          font-size: 12px
      .input-container
        margin-top: 6px
        padding-left: 16px
      .input
        width: 80%
        border-bottom: 1px solid #ccc
      .option
        margin: 6px 0 0 16px
        display: inline-block
        input
          vertical-align: middle
    .suggest
      padding:0 15px
      h3
        font-size: 16px
      textarea[name=suggest]
        width: 100%
        height: 6em
        margin-top: 10px
        resize: none
      .counts
        margin-top: 10px
        text-align: right
  .myReportResult
    background: #fff
    min-height: 100vh
    .answer-list
      padding: 15px 15px 0 15px
      li
        margin-bottom: 22px
      .answer
        margin: 6px 0 0 14px
        padding: 2px 0
        border-bottom: 1px solid #ccc
    .suggest
      padding: 15px
      h3
        margin-bottom: 10px
        font-size: 16px
        font-weight: initial
      .text
        border: 1px solid #cccccc
        min-height: 100px
        padding: 10px
</style>
