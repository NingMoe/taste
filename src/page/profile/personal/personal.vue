<template>
  <section class="personal" v-if="appData.userInfo">
    <h1 class="common-head">
      <a href="javascript:history.back()"><img src="../../../common/arrow-left.png" alt=""></a>
      个人信息
    </h1>
    <div class="head">
      <div class="avatar img-width">
        <img :src="appData.userInfo.headimg" alt="">
      </div>
      <div class="nick">
        {{appData.userInfo.nick}}
      </div>
    </div>
    <ul class="info-list">
      <li @click="updatePhone">
        手机号: {{appData.userInfo.telphone||'请填写'}}
      </li>
      <li @click="updateName">
        姓名: {{appData.userInfo.name||'请填写姓名'}}
      </li>
      <li @click="updateSex">
        性别: {{appData.userInfo.sex=='0'?'男':'女'}}
      </li>
      <li>
        剩余积分: {{appData.userInfo.score}}
      </li>
    </ul>

    <ui-dialog :data="phone" class="phone-dialog">
      <div class="input-container">
        <input type="text" name="userphone" v-model="phone.val" v-validate="{rules: {required: true, regex: /^1[3578][0-9]{9}$/}}">
        <span class="is-danger" v-show="errors.has('userphone')">请输入有效的手机号码</span>
      </div>
      <div class="input-container">
        <div class="phonecode-con"><input v-model="phone.code" type="number" name="phonecode" v-validate="'required'"></div>
        <div class="get-code-btn" :class="{disable: timer}" @click="getCode">
          <span v-if="timer">{{time}}s</span>
          <span v-else>获取</span>
        </div>
        <span class="is-danger" v-show="errors.has('phonecode')">请输入短信验证码</span>
        <span class="is-danger" v-show="codeErrorShow">验证码有误</span>
      </div>
    </ui-dialog>
    <ui-dialog :data="username">
      <div><input type="text" class="username" v-model.trim="username.val"></div>
    </ui-dialog>
    <ui-dialog :data="sex">
      <div class="sex-radio" value="0" @click="selectSex">男</div><div class="sex-radio" value="1" @click="selectSex">女</div>
    </ui-dialog>
    <ui-dialog :data="alert"></ui-dialog>
  </section>
</template>

<script type="text/ecmascript-6">
  import UiDialog from '../../../components/dialog/dialog'
  export default{
    components: {UiDialog},
    name: 'personal',
    data () {
      return {
        alert: {
          title: '提示',
          text: '',
          btns: ['确定'],
          visible: false
        },
        phone: {
          title: '请输入您的手机号',
          btns: ['取消', '确定'],
          val: '',
          code: '',
          visible: false,
          callback: (index, data) => {
            if (index === '0') {
              data.visible = false
              this.errors.clear()
            } else {
              this.$validator.validateAll({userphone: this.phone.val, phonecode: this.phone.code}).then(() => {
                this.$http.post('/web/test', {params: {phone: this.phone.val, code: this.phone.code}}).then(res => {
                  if (res.body === 'codeerror') {
                    this.codeErrorShow = true
                  } else if (res.body === 'fail') {
                    this.alert.text = '提交失败'
                  } else {
                    this.appData.userInfo.telphone = data.val
                    this.alert.text = '修改成功!'
                    this.alert.visible = true
                    this.phone.visible = false
                    this.phone.val = ''
                    this.phone.code = ''
                    clearInterval(this.timer)
                    this.timer = null
                    this.time = 60
                    this.$nextTick(function () {
                      this.errors.clear()
                    })
                  }
                })
              }).catch(() => {})
            }
          }
        },
        username: {
          title: '请输入您的姓名',
          btns: ['取消', '确定'],
          val: '',
          visible: false,
          callback: (index, data) => {
            if (index === '0') {
              data.visible = false
            } else if (index === '1' && data.val) {
              this.$http.post('/web/updateName', {params: {name: data.val}}).then(res => {
                if (res.body === 'success') {
                  this.appData.userInfo.name = data.val
                }
                this.alert.text = res.body === 'success' ? '修改成功!' : '修改失败, 出现未知错误'
                data.visible = false
                this.alert.visible = true
              })
            }
          }
        },
        sex: {
          title: '请选择您的性别',
          val: '',
          btns: ['取消', '确定'],
          visible: false,
          callback: (index, data) => {
            if (index === '0') {
              data.visible = false
            } else if (data.val) {
              this.$http.post('/web/updateSex').then(res => {
                if (res.body === 'success') {
                  this.appData.userInfo.sex = data.val
                }
                this.alert.text = res.body === 'success' ? '修改成功!' : '修改失败, 出现未知错误'
                data.visible = false
                this.alert.visible = true
              })
            }
          }
        },
        codeErrorShow: false,
        timer: null,
        time: 60
      }
    },
    props: {
      appData: {
        type: Object
      }
    },
    methods: {
      updatePhone () {
        this.phone.visible = true
      },
      updateName () {
        this.username.visible = true
      },
      updateSex () {
        this.sex.visible = true
      },
      getCode () {
        if (this.timer) {
          return
        }
        this.$validator.validate('userphone', this.phone.val).then(() => {
          // 手机验证通过, 发送验证码
          this.$http.post('/web/test', {params: {phone: this.phone.val}}).then(res => {
            if (res.body === 'exist') {
              this.alert.text = '号码被占用'
              this.alert.visible = true
            } else {
              // 开始倒计时
              this.timer = setInterval(() => {
                if (this.time <= 0) {
                  clearInterval(this.timer)
                  this.timer = null
                  this.time = 60
                }
                this.time--
              }, 1000)
            }
          })
        }).catch(() => {})
      },
      selectSex (e) {
        if (e.target.classList.contains('selected')) {
          return
        }
        let options = document.querySelectorAll('.sex-radio')
        options.forEach(function (e, i) {
          e.classList.remove('selected')
        })
        e.target.classList.add('selected')
        this.sex.val = e.target.getAttribute('value')
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .personal
    h1 a
    .head
      padding: 20px
      background: #fff
      .avatar,.nick
        display: inline-block
        vertical-align middle
      .avatar
        width: 50px
        height: 50px
        margin-right: 10px
        border-radius: 25px
        border:1px solid #ccc
        overflow: hidden
    .info-list
      margin-top:10px
      background: #fff
      li
        padding: 15px
        border-bottom: 1px solid #ccc
      li:last-child
        border-bottom: 0
    .phone-input-wrapper
      text-align: center
      input
        border: 1px solid #ddd
        margin-top: 10px
        padding: 5px
    .username
      padding: 5px
      border: 1px solid #ddd
    .sex-radio
      width: 5em
      height: 2.4em
      line-height: 2.4
      border: 1px solid #ddd
      display: inline-block
    .sex-radio:first-child
      border-top-left-radius: 3px
      border-bottom-left-radius: 3px
    .sex-radio:last-child
      border-top-right-radius: 3px
      border-bottom-right-radius: 3px
    .sex-radio.selected
      color: #00cc99
      border: 1px solid #00cc99
    .phone-dialog
      .input-container
        width: 75%
        position: relative
        margin: 0 auto 18px auto
      .is-danger
        position: absolute
        left: 0
        bottom: -14px
        color: red
        font-size: 12px
      .input-container:last-child
        display: flex
        .phonecode-con
          padding-right: 10px
        .get-code-btn
          flex: 0 0 60px
          display: flex
          align-items: center
          justify-content: center
          background: #00cc99
          color: #fff
        .get-code-btn.disable
          background: #999
      input
        width: 100%
        padding: 5px
        border: 1px solid #ddd
</style>
