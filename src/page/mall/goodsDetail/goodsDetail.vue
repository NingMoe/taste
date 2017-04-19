<template>
  <article class="goodsDetails">
    <header class="head">
      <h1 class="common-head">商品详情</h1>
      <swipe class="goods-swipe img-width" :auto="5000" :speed="300">
        <swipe-item v-for="item in goodsData.imgsrc" :key="item.id">
          <img :src="item" alt="">
        </swipe-item>
      </swipe>
      <div>{{ goodsData.goodsname }}</div>
    </header>
    <div class="points">
      兑换积分: {{ goodsData.score }}
    </div>
    <div class="address">
      兑换地址: {{ goodsData.address }}
    </div>
    <div class="description">
      <h2>商品描述:</h2>
      <div>
        {{ goodsData.goodsdetail }}
      </div>
    </div>
    <div class="goodsDetails-btns common-bottom-btns">
      <div class="btn" @click="buy">立即兑换</div>
      <div class="back-btn btn" @click="back">返回</div>
    </div>
    <ui-dialog :data="alert"></ui-dialog>
    <ui-dialog :data="confirm"></ui-dialog>
  </article>
</template>

<script type="text/ecmascript-6">
  import UiDialog from '@/components/dialog/dialog'
  export default{
    components: {UiDialog},
    name: 'goodsDetails',
    data () {
      return {
        goodsData: {},
        alert: {
          title: '提示',
          text: '',
          visible: false,
          btns: ['确定']
        },
        confirm: {
          title: '提示',
          text: '',
          visible: false,
          btns: ['取消', '确定'],
          callback: (i) => {
            if (i === '1') {
              alert(this.$route.params.id)
              this.$http.get('/web/cashGoods', {params: {goodsid: this.$route.params.id}}).then(res => {
                alert(res.body)
                if (res.body === 'success') {
                  this.alert.text = '兑换成功!'
                } else if (res.body === '2') {
                  this.alert.text = '兑换失败, 您的积分不足'
                } else {
                  this.alert.text = '兑换失败, 出现未知错误, 详情请咨询 028-86701038'
                }
                this.alert.visible = true
              })
            }
            this.confirm.visible = false
          }
        }
      }
    },
    mounted () {
      // this.$http.get('/static/mock/goods.json', { id: this.$route.params.id }).then((res) => {
      this.$http.get('/web/getGoodsDetail', {params: {id: this.$route.params.id}}).then((res) => {
        this.goodsData = res.body
      })
    },
    methods: {
      back () {
        history.back()
      },
      buy () {
        this.confirm.text = '您确定要使用 ' + this.goodsData.score + ' 积分兑换该商品吗?'
        this.confirm.visible = true
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .goodsDetails
    .head
      background: #fff
      text-align: center
      padding-bottom: 10px
      .goods-swipe
        height: 150px
        margin-bottom: 10px
        color: #fff
        font-size: 30px
        text-align: center
    .points,.address,.description
      margin-top: 10px
      padding: 8px 10px
      line-height: 1.2
      background: #fff
    .description h2
      font-size: 16px
      margin-bottom: 10px
  </style>
