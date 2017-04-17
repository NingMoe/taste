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
              <div class="pics-item common-addPic-btn"></div>
            </div>
          </div>
          <div class="pic-form-line">
            <div>上传产品安全证明书：</div>
            <div class="pics-container">
              <div class="pics-item">
                <img src="/static/temp/item-face.jpg" alt="">
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
  export default{
    name: 'join'
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
            width: 22%
            height: 20vw
            margin: 0 4% 10px 0
            border: 1px solid #ccc
          .pics-item img
            width: 100%
</style>
