<template>
  <section class="tasteRegister" v-if="tasteData">
    <h1>{{ tasteData.name }}</h1>
    <div class="info">{{ tasteData.username }}  {{ tasteData.addtime }}</div>
    <div class="rules">
      <header><img src="../activityDetail/rules-title.png" alt=""></header>
      <div class="rules-content">{{ tasteData.rules }}</div>
    </div>
    <div class="form-container">
      <header class="img-width"><img src="./form-title.png" alt=""></header>

      <form v-if="questions" id="registerform">
        <div class="form-line" v-for="(item, index) in questions">
          <h3>{{item.question}}: </h3>
          <div class="input-container" v-if="item.questiontype=='0'">
            <input type="text" :name="'input-'+item.id" class="input" v-validate="'required'" v-model="answerinfo[index].answer">
            <span v-show="errors.has('input-'+item.id)" class="help is-danger">* 必填</span>
          </div>
          <div class="input-container" v-else="item.questiontype=='1'">
            <template v-for="(inItem, ind) in item.options">
              <input type="radio" :name="'input-'+item.id" :id="'input-'+item.id+ind" v-validate="'required'" class="radio" :value="inItem.id" v-model="answerinfo[index].answer">
              <label :for="'input-'+item.id+ind">{{inItem.option}}</label>
            </template>
            <span v-show="errors.has('input-'+item.id)" class="help is-danger">请选择</span>
          </div>
        </div>
      </form>

      <div class="tasteRegister-btns common-bottom-btns">
        <div class="join-btn btn" @click="submit">立即参加</div>
        <div class="back-btn btn" @click="back">返回</div>
      </div>
    </div>
    <ui-dialog :data="alert"></ui-dialog>
  </section>
</template>

<script type="text/ecmascript-6">
  export default{
    data () {
      return {
        tasteData: {},
        questions: {},
        para: {
          activityid: this.$route.params.id,
          answerinfo: []
        },
        answerinfo: [],
        alert: {
          title: '提示',
          text: '',
          btns: ['确定'],
          visible: false
        }
      }
    },
    mounted () {
      this.$http.get('/web/getQuestionList', {params: {activityid: this.$route.params.id, papertype: 1}}).then(res => {
        this.tasteData = res.body.activity
        this.questions = res.body.questions
        for (let o in this.questions) {
          this.answerinfo.push({question: this.questions[o].id, answer: ''})
        }
      })
    },
    methods: {
      submit () {
        this.$validator.validateAll().then(() => {
          alert(JSON.stringify(this.answerinfo))
          this.$http.get('/web/enroll', {params: {answer: JSON.stringify({'activityid': this.$route.params.id, 'answerinfo': this.answerinfo})}}).then((res) => {
            if (res.body === 'success') {
              this.alert.text = '申请已提交，审核结果请在“个人中心-我的体验”中查看。'
              this.alert.visible = true
              let tempTimer = setTimeout(() => {
                // this.$router.replace({name: 'activityDetail', params: {id: this.$route.params.id}})
                this.$router.go(-1)
              }, 3000)
              this.alert.callback = () => {
                clearTimeout(tempTimer)
                // this.$router.replace({name: 'activityDetail', params: {id: this.$route.params.id}})
                this.$router.go(-1)
              }
            } else {
              this.alert.text = '很抱歉, 报名失败, 详情请咨询 ' + window.commonPhone
              this.alert.visible = true
            }
          })
        }).catch(() => {})
      },
      back () {
        history.back()
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .tasteRegister
    padding: 12px 12px 50px 12px
    background: #fff
    h1
      font-size: 18px
      line-height: 1.3
    .info
      margin: 8px 0 15px 0
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
    .form-container
      header
        width: 35%
        margin-bottom: 10px
      .form-line
        margin: 18px 0
        align-items: center
        label
          margin-right: 14px
        .input-container
          position: relative
          margin-top: 5px
        .radio
          vertical-align bottom
        .input
          width: 100%
          height: 100%
          padding: 5px
          border-radius: 3px
          border: 1px solid #fabe00
        .is-danger
          position: absolute
          bottom: -14px
          left: 0
          font-size: 12px
          color: red
</style>
