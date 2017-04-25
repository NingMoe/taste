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
              <input v-validate="'required'" name="name" type="text" class="input" v-model="para.source">
              <span v-show="errors.has('name')" class="is-danger">* 必填</span>
            </div>
          </li>
         <li class="form-line">
            <label>合作事项: </label>
            <div class="input-container">
              <input type="text" v-validate="'required'" class="input" name="business" v-model="para.business">
              <span v-show="errors.has('business')" class="is-danger">* 必填</span>
            </div>
          </li>
         <li class="form-line">
            <label>预计费用: </label>
            <div class="input-container">
              <input type="text" v-validate="'required'" class="input" name="cost" v-model="para.cost">
              <span v-show="errors.has('cost')" class="is-danger">* 必填</span>
            </div>
          </li>
         <li class="form-line">
            <label>联系电话: </label>
            <div class="input-container">
              <input type="text" v-validate="'required'" class="input" name="telphone" v-model="para.telphone">
              <span v-show="errors.has('telphone')" class="is-danger">* 必填</span>
            </div>
          </li>
        </ul>

        <div class="pic-form-container">
          <div class="pic-form-line">
            <div>上传营业执照：</div>
            <div class="pics-container">
              <div class="pics-item" v-if="licenceImage">
                <img :src="licenceImage" alt="">
                <div class="remove-btn" @click="removeImgage('licenceImage')">X</div>
              </div>
              <div class="pics-item common-addPic-btn" @click="licenseAdd"></div>
            </div>
          </div>
          <div class="pic-form-line">
            <div>上传产品安全证明书：</div>
            <div class="pics-container">
              <div class="pics-item" v-if="credentialImage">
                <img :src="credentialImage" alt="">
                <div class="remove-btn" @click="removeImgage('credentialImage')">X</div>
              </div>
              <div class="pics-item common-addPic-btn" @click="certificateAdd"></div>
            </div>
          </div>
          <div class="pic-form-line">
            <div>上传产品图片（最多9张）：</div>
            <div class="pics-container">
              <div class="pics-item" v-for="(item, index) in productImages">
                <img :src="item" alt="">
                <div class="remove-btn" @click="removeImgage(index)">X</div>
              </div>
              <div class="pics-item common-addPic-btn" @click="productAdd"></div>
            </div>
          </div>
        </div>
        <div class="common-text">*请确保您所填资料符合国家相关法律规定且真实有效，否则自行承担相关法律责任。</div>
      </form>
    </div>

    <div class="wait-lock" v-show="lockShow">
      正在上传图片,请稍等...
    </div>

    <div class="common-bottom-btns" @click="submit">
      立即入驻
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
  export default{
    name: 'join',
    data () {
      return {
        para: {
          source: '',
          business: '',
          cost: '',
          telphone: '',
          business_licence: '',
          safety_intro_img: '',
          productimg: ''
        },
        licenceImage: '',
        credentialImage: '',
        productImages: [],
        lockShow: false,
        index: 0,
        leng: 0
      }
    },
    methods: {
      // 点击上传营业执照
      licenseAdd () {
        window.wx.chooseImage({
          count: 1,  // 默认9
          sizeType: ['original', 'compressed'],  // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'],  // 可以指定来源是相册还是相机，默认二者都有
          success: (res) => {
            var localIds = res.localIds  // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
            this.licenceImage = localIds[0]
          }
        })
      },
      certificateAdd () {
        window.wx.chooseImage({
          count: 1,  // 默认9
          sizeType: ['original', 'compressed'],  // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'],  // 可以指定来源是相册还是相机，默认二者都有
          success: (res) => {
            var localIds = res.localIds  // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
            this.credentialImage = localIds[0]
          }
        })
      },
      productAdd () {
        window.wx.chooseImage({
          sizeType: ['original', 'compressed'],  // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'],  // 可以指定来源是相册还是相机，默认二者都有
          success: (res) => {
            var localIds = res.localIds  // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
            for (let o in localIds) {
              if (this.productImages.length < 9) {
                this.productImages.push(localIds[o])
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
      checkImage () {
        return (this.licenceImage !== '' && this.credentialImage !== '' && this.productImages.length > 0)
      },
      upLoad (localids) {
        return new Promise((resolve, reject) => {
          let index = 0
          let leng = localids.length
          let result = ''
          upload()
          function upload () {
            window.wx.uploadImage({
              localId: localids[index], // 需要上传的图片的本地ID，由chooseImage接口获得
              isShowProgressTips: 0, // 默认为1，显示进度提示
              success: res => {
                if (++index < leng) {
                  result += res.serverId + ','
                  upload()
                } else {
                  result += res.serverId
                  resolve(result)
                }
              }
            })
          }
        })
      },
      upLoadImages (callback) {
        this.upLoad([this.licenceImage]).then(res => {
          this.para.business_licence = res
          return this.upLoad([this.credentialImage])
        }).then(res => {
          this.para.safety_intro_img = res
          return this.upLoad(this.productImages)
        }).then(res => {
          this.para.productimg = res
          callback()
        })
      },
      reset () {
        this.para.source = ''
        this.para.business = ''
        this.para.cost = ''
        this.para.telphone = ''
        this.para.business_licence = ''
        this.para.safety_intro_img = ''
        this.para.productimg = ''
        this.licenceImage = ''
        this.credentialImage = ''
        this.productImages = []
      },
      submit () {
        this.$validator.validateAll().then(() => {
          if (this.checkImage()) {
            this.lockShow = true
            this.upLoadImages(() => {
              this.$http.get('/web/applyActivity', {params: this.para}).then(res => {
                if (res.body === 'success') {
                  alert('申请成功')
                } else {
                  alert('申请失败')
                }
                this.lockShow = false
              })
            })
          } else {
            alert('请选择图片')
          }
        }).catch(() => {})
      }
    },
    mounted () {
      window.wxConfig()
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .top-join
    padding-bottom: 40px
    background: #fff
    input
      -webkit-appearance: none
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
            overflow: hidden
            margin: 0 4% 10px 0
            border: 1px solid #ccc
            .remove-btn
              width: 16px
              height: 16px
              text-align: center
              line-height: 16px
              font-family: '微软雅黑'
              color: #fff
              background: rgba(0, 0, 0, 0.5)
              position: absolute
              top: 0
              right: 0
          .pics-item img
            width: 100%
    .wait-lock
      position: fixed
      z-index: 9999
      top: 0
      right: 0
      left: 0
      bottom: 0
      text-align: center
      padding-top: 48vh
      color: #fff
      background: rgba(0, 0, 0, 0.6)
</style>
