<template>
  <div class="uiDialog" v-show="data.visible">
    <div class="dialog-wrapper">
      <div class="dialog-head">{{data.title}}</div>
      <div class="dialog-body"><slot></slot>{{data.text}}</div>
      <div class="dialog-foot" @click="clickEvent">
        <div class="btn" v-for="(btn, index) in data.btns" :index="index">{{btn}}</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'uiDialog',
    props: {
      data: {
        type: Object
      }
    },
    data () {
      return {
        index: ''
      }
    },
    mounted () {},
    methods: {
      clickEvent (e) {
        if (this.data.callback) {
          this.data.callback(e.target.getAttribute('index'), this.data)
        } else {
          this.data.visible = false
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .uiDialog
    position: fixed
    top: -20px
    left: -20px
    right: -20px
    bottom: -20px
    text-align: center
    background: rgba(0,0,0,0.6)
    .dialog-wrapper
      width: 76%
      position: absolute
      top: 50%
      left: 50%
      border-radius: 4px
      transform: translate(-50%, -50%)
      background: #fff
      .dialog-head
        height: 40px
        line-height: 40px
        font-size: 16px
      .dialog-body
        min-height: 60px
        padding: 0 10px
        text-align: center
        line-height: 1.2
        .form-line
          margin-bottom: 10px
        .form-line label
          display: block
          margin-bottom: 4px
        .form-line input
          padding: 4px
          border: 1px solid #ddd
      .dialog-foot
        display: flex
        height: 40px
        line-height: 40px
        border-top: 1px solid #ddd
        .btn
          flex: 1
          border-right: 1px solid #ddd
        .btn:last-child
          border-right:0
</style>
