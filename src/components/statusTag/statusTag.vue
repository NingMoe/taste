<template>
  <div class="statusTag" :class="['bgcolor-'+classType]" v-if="type!='myCashRecord'">
    {{ textMap[type][status] }}
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    name: 'statusTag',
    props: ['status', 'type'],
    methods: {},
    data () {
      return {
        textMap: {
          'myActivityList': {
            '0': '待审核',
            '1': '体验中',
            '2': '未通过',
            '3': '已结束'
          },
          'myReportList': {   // 0 未提交 1已填写 2已通过 3未通过
            '0': '待填写',
            '1': '待审核',
            '2': '已通过',
            '3': '未通过',
            '4': '已过期'
          }
        }
      }
    },
    mounted () {},
    computed: {
      classType () {
        if (this.$route.params.name === 'myActivityList' || this.type === 'myActivityList') {
          switch (this.status) {
            case '0':
            case 0:
              return 2
            case '1':
            case 1:
              return 1
            case '2':
            case 2:
              return 4
            case '3':
            case 3:
              return 3
          }
        } else {
          switch (this.status) {
            case '0':
            case 0:
              return 2
            case '1':
            case 1:
              return 3
            case '2':
            case 2:
              return 5
            case '3':
            case 3:
              return 1
            case '4':
            case 4:
              return 4
          }
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl'

  .statusTag
    width: 24px
    padding: 5px
    position: absolute
    top: 0
    right: 5px
    color: #fff
  .statusTag:before,.statusTag:after
    content: ''
    display: block
    width: 0
    height: 0
    position: absolute
    bottom: -12px
    border-style: solid
    border-top-width: 6px
    border-left-width: 6px
    border-right-width: 6px
    border-bottom-width: 6px
    border-bottom-color: transparent
  .statusTag:before
    left: 0
    border-right-color: transparent
  .statusTag:after
    right: 0
    border-left-color: transparent
  .statusTag.bgcolor-1
    statusTag(#fabe00)
  .statusTag.bgcolor-2
    statusTag(#eb191a)
  .statusTag.bgcolor-3
    statusTag(#0071ac)
  .statusTag.bgcolor-4
    statusTag(#616161)
  .statusTag.bgcolor-5
    statusTag(#0c9)
</style>
