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
      <li @click="showDialog">
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

    <v-dialog :dialogData="phoneDialog"></v-dialog>

  </section>
</template>

<script type="text/ecmascript-6">
  import vDialog from '../../../components/dialog/dialog'

  export default{
    name: 'personal',
    data () {
      return {
        phoneDialog: {
          title: '请输入新手机号',
          content: '<input type="text" name="user"><input type="text" name="phone">',
          btns: ['取消', '确定'],
          isShow: false,
          callback: function (index, values) {
            if (index === '0') {
              this.isShow = false
            } else {
              alert(values.user)
            }
          }
        }
      }
    },
    props: {
      userInfo: {
        type: Object
      }
    },
    components: {
      vDialog
    },
    methods: {
      showDialog () {
        this.phoneDialog.isShow = true
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
</style>
