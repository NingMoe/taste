<template>
  <section class="tasteRegister">
    <h1>{{ tasteData.name }}</h1>
    <div class="info">{{ tasteData.username }}  {{ tasteData.addtime }}</div>
    <div class="rules">
      <header><img src="../activityDetail/rules-title.png" alt=""></header>
      <div class="rules-content">{{ tasteData.rules }}</div>
    </div>
    <div class="form-container">
      <header class="img-width"><img src="./form-title.png" alt=""></header>

      <form v-if="questions" id="registerform">
        <div class="form-line" v-for="item in questions">
          <h3>{{item.question}}: </h3>
          <div class="input-container" v-if="item.type==='1'">
            <input type="text" :name="'input-'+item.id" class="input" v-validate="'required'" v-model="serialize[item.id]">
            <span v-show="errors.has('input-'+item.id)" class="help is-danger">* 必填</span>
          </div>
          <div class="input-container" v-else="item.type==='2'">
            <template v-for="(value, key, index) in item.options">
              <input type="radio" :name="'input-'+item.id" :id="'input-'+item.id+index" v-validate="'required'" class="radio" :value="key" v-model="serialize[item.id]">
              <label :for="'input-'+item.id+index">{{value}}</label>
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
        questions: [],
        serialize: {},
        alert: {
          title: '提示',
          text: '',
          btns: ['确定'],
          visible: false
        }
      }
    },
    mounted () {
      this.$http.get('/web/getQuestion').then(res => {
        this.questions = res.body.question
        this.tasteData = res.body.activity
        for (let o in this.questions) {
          this.serialize[this.questions[o].id] = null
        }
      })
    },
    computed: {
      test () {
        return this.questions.slice(0, 1)
      }
    },
    methods: {
      submit () {
        this.$validator.validateAll().then(() => {
          let para = {
            'activityid': this.activity.id,
            'answerinfo': [
              {'question': '1', 'answer': '11'},
              {'question': '2', 'answer': '啊哈哈哈'}
            ]
          }
          this.$http.post('/web/enroll', para).then((res) => {
            if (res.body === 'ok') {
              this.alert.text = '申请已提交，审核结果请在“个人中心-我的体验”中查看。'
              this.alert.visible = true
              document.getElementById('registerform').reset()
            } else {
              this.alert.text = '很抱歉, 报名失败, 详情请咨询 028-86701038'
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
