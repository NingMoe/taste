<template>
  <div class="vDialog" v-if="dialogData.isShow">

    <div class="dialog-wrapper">
      <div class="dialog-head">{{dialogData.title}}</div>
      <div class="dialog-body" v-html="dialogData.content" ref="dialogBody"></div>
      <div class="dialog-foot" @click="clickEvent">
        <div class="btn" v-for="(item,index) in dialogData.btns" :index="index">{{item}}</div>
      </div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'vDialog',
    props: {
      dialogData: {
        type: Object
      }
    },
    data () {
      return {
        isShow: false
      }
    },
    methods: {
      clickEvent (e) {
        let elems = this.$refs.dialogBody.querySelectorAll('input')
        let obj = {}
        for (let o of elems) {
          obj[o.name] = o.value
        }
        this.dialogData.callback(e.target.getAttribute('index'), obj)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .vDialog
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
        text-align: left
        line-height: 1.2
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
