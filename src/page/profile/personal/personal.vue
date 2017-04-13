<template>
  <section class="personal">
    <h1 class="common-head">
      <router-link to="/profile"><img src="../../../common/arrow-left.png" alt=""></router-link>
      个人信息
    </h1>
    <div class="head">
      <div class="avatar img-width">
        <img src="./avatar.jpg" alt="">
      </div>
      <div class="nick">
        刨坟boys
      </div>
    </div>
    <ul class="info-list">
      <li @click="changePhone">
        手机号: 18775226607
      </li>
      <li>
        姓名: 陈海俊
      </li>
      <li>
        性别: 男
      </li>
      <li>
        剩余积分: 4534
      </li>
    </ul>

    <ui-dialog :data="phone">
      <span slot="head">提示</span>
      <div class="phone-input-wrapper">
        <p>请输入您的手机号</p>
        <input type="text" name="userphone">
      </div>
      <div slot="foot" class="btn" index="1">取消</div>
      <div slot="foot" class="btn" index="2">确定</div>
    </ui-dialog>
  </section>
</template>

<script type="text/ecmascript-6">
  import uiDialog from '../../../components/dialog/dialog'
  export default{
    name: 'personal',
    data () {
      return {
        phone: {
          callback (index, val) {
            if (index === '2') {
              console.log(val)
            }
            this.visible = false
          },
          visible: false
        }
      }
    },
    props: {
      userInfo: {
        type: Object
      }
    },
    methods: {
      changePhone () {
        this.phone.visible = true
      }
    },
    components: {
      uiDialog
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
</style>
