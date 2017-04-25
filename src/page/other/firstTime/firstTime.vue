<template>
  <section class="firstTime">
    <h1 class="common-head">
      测测你的体验维度
      <a href="javascript:history.back()"><img src="../../../common/arrow-left.png" alt=""></a>
    </h1>

    <ul class="question-list">
      <li class="question-item">
        <h3>1. 您的性别</h3>
        <div class="options">
          <input type="radio" class="radio" value="男" name="question-1" id="question-1-1" v-model="answerinfo[0].answer" v-validate="'required'">
          <label for="question-1-1">男</label>
          <input type="radio" class="radio" value="女" name="question-1" id="question-1-2" v-model="answerinfo[0].answer">
          <label for="question-1-2">女</label>
        </div>
        <span v-show="errors.has('question-1')" class="is-danger">请选择</span>
      </li>
      <li class="question-item">
        <h3>2. 您的年龄为</h3>
        <div class="options">
          <input type="radio" class="radio" value="18-25" name="question-2" id="question-2-1" v-model="answerinfo[1].answer" v-validate="'required'"><label for="question-2-1">18-25</label>
          <input type="radio" class="radio" value="26-35" name="question-2" id="question-2-2" v-model="answerinfo[1].answer"><label for="question-2-2">26-35</label>
          <input type="radio" class="radio" value="36-50" name="question-2" id="question-2-3" v-model="answerinfo[1].answer"><label for="question-2-3">36-50</label>
          <input type="radio" class="radio" value="51-60" name="question-2" id="question-2-4" v-model="answerinfo[1].answer"><label for="question-2-4">51-60</label>
        </div>
        <span v-show="errors.has('question-2')" class="is-danger">请选择</span>
      </li>
      <li class="question-item">
        <h3>3. 您最想获得的免费体验产品品类为</h3>
        <div class="options">
          <input type="radio" class="radio" value="试吃试玩" name="question-3" id="question-3-1" v-model="answerinfo[2].answer" v-validate="'required'"><label for="question-3-1">试吃试玩</label>
          <input type="radio" class="radio" value="衣妆类" name="question-3" id="question-3-2" v-model="answerinfo[2].answer"><label for="question-3-2">衣妆类</label>
          <input type="radio" class="radio" value="电子产品" name="question-3" id="question-3-3" v-model="answerinfo[2].answer"><label for="question-3-3">电子产品</label>
          <input type="radio" class="radio" value="生活日用品" name="question-3" id="question-3-4" v-model="answerinfo[2].answer"><label for="question-3-4">生活日用品</label>
        </div>
        <span v-show="errors.has('question-3')" class="is-danger">请选择</span>
      </li>
      <li class="question-item">
        <h3>4. 您每月最大比例的开销在</h3>
        <div class="options">
          <input type="radio" class="radio" value="美食休闲" name="question-4" id="question-4-1" v-model="answerinfo[3].answer" v-validate="'required'"><label for="question-4-1">美食休闲</label>
          <input type="radio" class="radio" value="美妆衣鞋" name="question-4" id="question-4-2" v-model="answerinfo[3].answer"><label for="question-4-2">美妆衣鞋</label>
          <input type="radio" class="radio" value="电子产品" name="question-4" id="question-4-3" v-model="answerinfo[3].answer"><label for="question-4-3">电子产品</label>
          <input type="radio" class="radio" value="日用必需品" name="question-4" id="question-4-4" v-model="answerinfo[3].answer"><label for="question-4-4">日用必需品</label>
        </div>
        <span v-show="errors.has('question-4')" class="is-danger">请选择</span>
      </li>
      <li class="question-item">
        <h3>5. 您所属的机构性质</h3>
        <div class="options">
          <input type="radio" class="radio" value="公务事业单位" name="question-5" id="question-5-1" v-model="answerinfo[4].answer" v-validate="'required'"><label for="question-5-1">公务事业单位</label>
          <input type="radio" class="radio" value="外资合资企业" name="question-5" id="question-5-2" v-model="answerinfo[4].answer"><label for="question-5-2">外资合资企业</label>
          <input type="radio" class="radio" value="民营" name="question-5" id="question-5-3" v-model="answerinfo[4].answer"><label for="question-5-3">民营</label>
          <input type="radio" class="radio" value="自由职业" name="question-5" id="question-5-4" v-model="answerinfo[4].answer"><label for="question-5-4">自由职业</label>
        </div>
        <span v-show="errors.has('question-5')" class="is-danger">请选择</span>
      </li>
      <li class="question-item">
        <h3>6. 您所属的专业领域为</h3>
        <div class="options">
          <input type="radio" class="radio" value="科技技术类" name="question-6" id="question-6-1" v-model="answerinfo[5].answer" v-validate="'required'"><label for="question-6-1">科技技术类</label>
          <input type="radio" class="radio" value="市场类" name="question-6" id="question-6-2" v-model="answerinfo[5].answer"><label for="question-6-2">市场类</label>
          <input type="radio" class="radio" value="行政公职类" name="question-6" id="question-6-3" v-model="answerinfo[5].answer"><label for="question-6-3">行政公职类</label>
          <input type="radio" class="radio" value="文化创意" name="question-6" id="question-6-4" v-model="answerinfo[5].answer"><label for="question-6-4">文化创意</label>
          <input type="radio" class="radio" value="管理类" name="question-6" id="question-6-5" v-model="answerinfo[5].answer"><label for="question-6-5">管理类</label>
        </div>
        <span v-show="errors.has('question-6')" class="is-danger">请选择</span>
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
            'question': '您的性别',
            'answer': ''
          },
          {
            'question': '您的年龄为',
            'answer': ''
          },
          {
            'question': '您最想获得的免费体验产品品类为',
            'answer': ''
          },
          {
            'question': '您每月最大比例的开销在',
            'answer': ''
          },
          {
            'question': '您所属的机构性质',
            'answer': ''
          },
          {
            'question': '您所属的专业领域为',
            'answer': ''
          }
        ]
      }
    },
    methods: {
      submit () {
        this.$validator.validateAll().then(() => {
          this.$http.get('/web/firstLoginAnswer', {params: {'answer': JSON.stringify({'answerinfo': this.answerinfo})}}).then(res => {
            if (res.body === 'success') {
              this.alert.text = '恭喜您提交成功, 3秒后跳到报名页面'
              let tempTimer = setTimeout(() => {
                this.$router.replace({name: 'activityRegister', params: {id: this.$route.params.id}})
              }, 3000)
              this.alert.callback = () => {
                clearTimeout(tempTimer)
                this.$router.replace({name: 'activityRegister', params: {id: this.$route.params.id}})
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
        label
          margin-right: 4px
      .is-danger
        position: absolute
        bottom: -14px
        left: 16px
        font-size: 12px
        color: red

</style>
