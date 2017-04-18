<template>
  <section class="top-join">
    <h1 class="common-head">
      入驻申请
      <router-link to="/"><img src="../../../common/arrow-left.png" alt=""></router-link>
    </h1>
    <div class="head">
      <div class="logo img-width">
        <img src="../../../common/logo.png" alt="成都太阳黑子文化传媒有限公司">
      </div>
      <div class="title">
        品新平台商家申请活动资料填写
      </div>
    </div>
    <div class="form-container">
      <form action="">
        <ul>
          <li class="form-line">
            <label>企业名称: </label>
            <div class="input-container">
              <input v-validate="'required'" name="name" type="text" class="input">
              <span v-show="errors.has('name')" class="is-danger">* 必填</span>
            </div>
          </li>
         <li class="form-line">
            <label>合作事项: </label>
            <div class="input-container">
              <input type="text" v-validate="'required'" class="input" name="business">
              <span v-show="errors.has('business')" class="is-danger">* 必填</span>
            </div>
          </li>
         <li class="form-line">
            <label>预计费用: </label>
            <div class="input-container">
              <input type="text" v-validate="'required'" class="input" name="cost">
              <span v-show="errors.has('cost')" class="is-danger">* 必填</span>
            </div>
          </li>
         <li class="form-line">
            <label>联系电话: </label>
            <div class="input-container">
              <input type="text" v-validate="'required'" class="input" name="phone">
              <span v-show="errors.has('phone')" class="is-danger">* 必填</span>
            </div>
          </li>
        </ul>

        <div class="pic-form-container">
          <div class="pic-form-line">
            <div>上传营业执照：</div>
            <div class="pics-container">
              <div class="pics-item" v-if="licenseImage">
                <img :src="licenseImage" alt="">
                <div class="remove-btn" @click="removeImgage('licenseImage')"></div>
              </div>
              <div class="pics-item common-addPic-btn" @click="licenseAdd"></div>
            </div>
          </div>
          <div class="pic-form-line">
            <div>上传产品安全证明书：</div>
            <div class="pics-container">
              <div class="pics-item" v-if="certificateImage">
                <img :src="certificateImage" alt="">
                <div class="remove-btn" @click="removeImgage('certificateImage')"></div>
              </div>
              <div class="pics-item common-addPic-btn"></div>
            </div>
          </div>
          <div class="pic-form-line">
            <div>上传产品图片（最多9张）：</div>
            <div class="pics-container">
              <div class="pics-item" v-for="(item, index) in productImages">
                <img :src="item" alt="">
                <div class="remove-btn" @click="removeImgage(index)"></div>
              </div>
              <div class="pics-item common-addPic-btn"></div>
            </div>
          </div>
        </div>
        <div class="common-text">*请确保您所填资料符合国家相关法律规定且真实有效，否则自行承担相关法律责任。</div>
      </form>
    </div>
    <div class="common-bottom-btns" @click="submit">
      立即入驻
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
  import wx from 'weixin-js-sdk'
  export default{
    name: 'join',
    data () {
      return {
        licenseImage: '/static/images/muwu.jpg',
        certificateImage: '/static/images/muwu.jpg',
        productImages: ['/static/images/muwu.jpg', '/static/images/shuijiao.jpg', '/static/images/yuantiao.jpg']
      }
    },
    methods: {
      licenseAdd () {
        let _this = this
        wx.chooseImage({
          count: 1,  // 默认9
          sizeType: ['original', 'compressed'],  // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'],  // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
            var localIds = res.localIds  // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
            _this.licenseImage = localIds[0]
          }
        })
      },
      certificateAdd () {
        let _this = this
        wx.chooseImage({
          count: 1,  // 默认9
          sizeType: ['original', 'compressed'],  // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'],  // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
            var localIds = res.localIds  // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
            _this.certificateImage = localIds[0]
          }
        })
      },
      productAdd () {
        let _this = this
        wx.chooseImage({
          sizeType: ['original', 'compressed'],  // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'],  // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
            var localIds = res.localIds  // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
            for (let o in localIds) {
              if (_this.productImages.length < 9) {
                _this.productImages.push(localIds[o])
              } else {
                alert('最多上传9张')
                break
              }
            }
          }
        })
      },
      removeImgage (image) {
        if (typeof image === 'number') {
          this.productImages.splice(image, 1)
        } else {
          this[image] = ''
        }
      },
      submit () {
        this.$validator.validateAll().then(() => {
          console.log('success')
        }).catch(() => {})
      }
    },
    mounted () {
      /*
      this.$http.get('/web/getWxConfig').then(res => {
        wx.config({
          debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: res.body.appid,  // 必填，公众号的唯一标识
          timestamp: res.body.timestamp,  // 必填，生成签名的时间戳
          nonceStr: res.body.nonceStr,  // 必填，生成签名的随机串
          signature: res.body.signature, // 必填，签名，见附录1
          jsApiList: ['chooseImage']  // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        })
      })
      */
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .top-join
    padding-bottom: 40px
    background: #fff
    .head
      padding: 30px 0 0px 0
      text-align center
      color: #0070ac
      .logo
        width: 60%
        margin: 0 auto
      .title
        margin: 20px 0 0 0
    .form-container
      padding: 15px
      .form-line
        display: flex
        align-items: center
        margin: 12px 0 18px 0
      .input-container
        flex: 1
        position: relative
        padding-left: 10px
        .input
          padding: 5px
          width: 100%
          border: 1px solid #fabe00
        .is-danger
          position: absolute
          bottom: -14px
          color: red
          font-size: 12px
      .pic-form-container
        margin-top: 30px
        .pics-container
          display: flex
          flex-wrap: wrap
          margin-top: 10px
          .pics-item
            position: relative
            width: 22%
            height: 20vw
            margin: 0 4% 10px 0
            border: 1px solid #ccc
            .remove-btn
              width: 15px
              height: 15px
              background: red
              position: absolute
              top: 0
              right: 0
          .pics-item img
            width: 100%
</style>
