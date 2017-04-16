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
          <div class="input-container" v-if="item.type == 1">
            <input type="text" :name="'input-'+item.id" class="input" v-validate="'required'">
            <span v-show="errors.has('input-'+item.id)" class="help is-danger">* 必填</span>
          </div>
          <template v-else="item.type==2">
            <div class="option" v-for="(option,key) in item.options">
              <input type="radio" v-validate="'required'" :id="'radio'+item.id+key" :name="'input-'+item.id" :value="key" class="radio">
              <label :for="'radio'+item.id+key">{{option}}</label>
            </div>
            <span v-show="errors.has('input-'+item.id)" class="help is-danger">请选择</span>
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
        }
      }
    },
    mounted () {
      // this.$http.get('/static/mock/question.json').then(res => {
      this.$http.get('/web/getQuestion', {id: this.$route.params.id, activityid: this.$route.params.activityid}).then(res => {
        this.questions = res.body.question
        this.activity = res.body.activity
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
          this.$http.post('/web/postReport', para).then(res => {
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
