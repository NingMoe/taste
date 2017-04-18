<template>
  <section class="myReport" v-if="questions">
    <h1 class="common-head">
      填写体验报告
      <div class="back-btn" @click="back"><img src="../../../common/arrow-left.png" alt=""></div>
    </h1>
    <form id="myreportform">
      <ul class="question-list">
        <li class="question-item" v-for="(item, index) in questions">
          <h3>{{index+1}}. {{item.question}}</h3>
          <div class="input-container" v-if="item.questiontype == 0">
            <input type="text" :name="'input-'+item.id" class="input" v-validate="'required'">
            <span v-show="errors.has('input-'+item.id)" class="is-danger">* 必填</span>
          </div>
          <template v-else="item.questiontype==1">
            <div class="option" v-for="(option, ind) in item.options">
              <input type="radio" v-validate="'required'" :id="'radio'+item.id+ind" :name="'input-'+item.id" :value="option.id" class="radio">
              <label :for="'radio'+item.id+ind">{{option.option}}</label>
            </div>
            <span v-show="errors.has('input-'+item.id)" class="is-danger">请选择</span>
          </template>
        </li>
      </ul>
    </form>
    <div class="suggest">
      <h3>请留下您对这次体验的意见或建议</h3>
      <textarea name="suggest" v-model="serialize.suggest" maxlength="500" placeholder="请填写您的意见或建议，不超过500字"></textarea>
      <div class="counts">{{serialize.suggest.length}}/500</div>
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
        activity: {},
        serialize: {
          suggest: ''
        },
        para: {
          activityid: this.$route.params.id,
          answerinfo: []
        }
      }
    },
    mounted () {
      // this.$http.get('/static/mock/question.json').then(res => {
      this.$http.get('/web/getQuestion', {params: {activityid: this.$route.params.activityid, papertype: 0}}).then(res => {
        this.questions = res.body.questions
        this.activity = res.body.activity
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
          let para = {
            'activityid': this.activity.id,
            'answerinfo': [
              {'question': '1', 'answer': '11'},
              {'question': '2', 'answer': '啊哈哈哈'}
            ]
          }
          this.$http.post('/web/postReport', {params: para}).then(res => {
            if (res.body === 'success') {
              console.log('success')
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
</style>
