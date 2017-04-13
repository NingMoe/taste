<template>
  <section class="tasteRegister">
    <h1>{{ tasteData.title }}</h1>
    <div class="info">{{ tasteData.author }}  {{ tasteData.addTime }}</div>
    <div class="rules">
      <header><img src="../tasteDetails/rules-title.png" alt=""></header>
      <div class="rules-content">{{ tasteData.rules }}</div>
    </div>
    <div class="form-container">
      <header class="img-width"><img src="./form-title.png" alt=""></header>

      <validator name="valida">
        <form>
          <div class="form-line">
            <label for="username">姓　　名: </label>
            <div class="input-container">
              <input type="text" name="username" id="username" class="input" v-model="serialize.username">
            </div>
          </div>
          <div class="form-line">
            <label for="userphone">联系方式: </label>
            <div class="input-container">
              <input type="text" name="userphone" id="userphone" class="input" v-model="serialize.userphone">
            </div>
          </div>
          <div class="form-line">
            <label for="nums">参加人数: </label>
            <div class="input-container">
              <input type="text" name="nums" id="nums" class="input" v-model="serialize.nums">
            </div>
          </div>
          <div class="form-line">
            <label>是否驾车: </label>
            <div class="input-container">
              <input type="radio" name="usecar" class="radio" value="1" v-model="serialize.usecar">是
              <input type="radio" name="usecar" class="radio" value="0" v-model="serialize.usecar">否
            </div>
          </div>
        </form>
      </validator>
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
        serialize: {
          username: null,
          userphone: null,
          nums: null,
          usecar: null
        },
        alert: {
          title: '提示',
          text: '恭喜您报名成功!',
          btns: ['确定'],
          visible: false
        }
      }
    },
    mounted () {
      if (this.$route.params.tasteData) {
        this.tasteData = this.$route.params.tasteData
      } else {
        this.$http.get('/api/getTasteById', {id: this.$route.params.id}).then((res) => {
          this.tasteData = res.body
        })
      }
    },
    methods: {
      submit () {
        this.$http.post('/api/test', this.serialize).then((res) => {
          if (res.body === 'ok') {
            this.alert.visible = true
          } else {
            this.alert.text = '很抱歉, 报名失败, 详情请咨询 028-86701038'
            this.alert.visible = true
          }
        })
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
        display: flex
        margin: 10px 0
        align-items: center
        label
          padding-left: 2em
        .input-container
          flex: 1
          padding-left: 10px
          .input
            width: 100%
            height: 100%
            padding: 5px
            border-radius: 3px
            border: 1px solid #fabe00
          .radio
            vertical-align bottom
</style>
