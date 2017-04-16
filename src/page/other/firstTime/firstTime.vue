<template>
  <section class="firstTime">
    <h1 class="common-head">
      测测你的体验维度
      <a href="javascript:history.back()"><img src="../../../common/arrow-left.png" alt=""></a>
    </h1>

    <ul class="question-list">
      <li class="question-item">
        <h3>1. 你最希望获得的免费体验产品品类</h3>
        <div class="input-container">
          <input type="text" class="input" v-validate="'required'" name="quetion-1" v-model="answerinfo[0].answer">
        </div>
        <span v-show="errors.has('quetion-1')" class="help is-danger">* 必填</span>
      </li>
      <li class="question-item">
        <h3>2. 您最常用的购物品台</h3>
        <div class="options">
          <input type="radio" class="radio" value="1" v-validate="'required'" name="quetion-2" id="quetion-2-1" v-model="answerinfo[1].answer">
          <label for="quetion-2-1">是</label>
          <input type="radio" class="radio" value="2" name="quetion-2" id="quetion-2-2" v-model="answerinfo[1].answer">
          <label for="quetion-2-2">否</label>
        </div>
        <span v-show="errors.has('quetion-2')" class="help is-danger">请选择</span>
      </li>
      <li class="question-item">
        <h3>3. 你最希望获得的免费体验产品品类</h3>
        <div class="input-container">
          <input type="text" class="input" v-validate="'required'" name="quetion-3" v-model="answerinfo[2].answer">
        </div>
        <span v-show="errors.has('quetion-3')" class="help is-danger">* 必填</span>
      </li>
      <li class="question-item">
        <h3>4. 您最常用的购物品台</h3>
        <div class="options">
          <input type="radio" class="radio" value="1" v-validate="'required'" name="quetion-4" id="quetion-4-1" v-model="answerinfo[3].answer">
          <label for="quetion-4-1">是</label>
          <input type="radio" class="radio" value="2" name="quetion-4" id="quetion-4-2" v-model="answerinfo[3].answer">
          <label for="quetion-4-2">否</label>
        </div>
        <span v-show="errors.has('quetion-4')" class="help is-danger">请选择</span>
      </li>
    </ul>

    <div class="tasteDetails-btns common-bottom-btns">
      <div class="btn" @click="submit">提交答案</div>
      <div class="btn" @click="back">返回</div>
    </div>
    <ui-dialog :data="alert"></ui-dialog>
  </section>
</template>

<script type="text/ecmascript-6">
  import UiDialog from '../../../components/dialog/dialog'
  export default{
    components: {UiDialog},
    name: 'firstTime',
    data () {
      return {
        alert: {
          title: '提示',
          text: '',
          visible: false,
          btns: ['确定']
        },
        answerinfo: [
          {
            'question': '1',
            'answer': ''
          },
          {
            'question': '2',
            'answer': ''
          },
          {
            'question': '3',
            'answer': ''
          },
          {
            'question': '4',
            'answer': ''
          }
        ]
      }
    },
    methods: {
      submit () {
        this.$validator.validateAll().then(() => {
          this.$http.post('/web/firstTime', {'answerinfo': this.answerinfo}).then(res => {
            if (res.body === 'success') {
              this.alert.text = '恭喜您提交成功'
              setTimeout(function () {
                history.back()
              }, 3000)
              this.alert.callback = function () {
                history.back()
              }
            } else {
              this.alert.text = '很抱歉, 提交失败, 详情请咨询 028-86701038'
            }
            this.alert.visible = true
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
  .firstTime
    min-height: 100vh
    padding-bottom: 40px
    background: #fff
    .question-list
      padding: 15px
      .question-item
        position: relative
        margin: 5px 0 18px 0
      .input-container,.options
        margin-top: 10px
        padding-left: 16px
      .input
        width: 80%
        border-bottom: 1px solid #ccc
      .options
        margin-right: 10px
        display: inline-block
        input
          vertical-align: middle
      .is-danger
        position: absolute
        bottom: -14px
        left: 16px
        font-size: 12px
        color: red

</style>
