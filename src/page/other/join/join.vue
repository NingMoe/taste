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
              <div class="pics-item common-addPic-btn" @click="licenseClick"></div>
            </div>
          </div>
          <div class="pic-form-line">
            <div>上传产品安全证明书：</div>
            <div class="pics-container">
              <div class="pics-item">
                <img src="/static/temp/item-face.jpg" alt="">
                <div class="remove-btn"></div>
              </div>
              <div class="pics-item common-addPic-btn"></div>
            </div>
          </div>
          <div class="pic-form-line">
            <div>上传产品图片（最多9张）：</div>
            <div class="pics-container">
              <div class="pics-item common-addPic-btn"></div>
            </div>
          </div>
        </div>
        <div class="common-text">*请确保您所填资料符合国家相关法律规定且真实有效，否则自行承担相关法律责任。</div>
      </form>
    </div>
    <div class="common-bottom-btns">
      立即入驻
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
  import wx from 'weixin-js-sdk'
  export default{
    name: 'join',
    methods: {
      licenseClick () {
        wx.chooseImage({
          count: 1,  // 默认9
          sizeType: ['original', 'compressed'],  // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'],  // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
            var localIds = res.localIds  // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
            alert(localIds)
          }
        })
      }
    },
    mounted () {
      wx.chooseImage({
        count: 1,  // 默认9
        sizeType: ['original', 'compressed'],  // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'],  // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          var localIds = res.localIds  // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
          alert(localIds)
        }
      })
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
