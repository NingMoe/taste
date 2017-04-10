<template>
  <section class="cooperation">
    <h1 class="common-head">
      合作对接
      <!--<router-link to="/"><img src="../../../common/arrow-left.png" alt=""></router-link>-->
    </h1>
    <div class="logo img-width">
      <img src="../../../common/logo.png" alt="">
    </div>
    <div class="form-container">
      <div class="form-line">
        <label for="">联系电话:</label>
        <input type="text" class="input">
      </div>
      <div class="form-line">
        <label for="">公司邮箱:</label>
        <input type="text" class="input">
      </div>
      <div class="form-line">
        <label for="">公司地址:</label>
        <input type="text" class="input">
      </div>
    </div>
    <!--<div class="common-bottom-btns">
      提交
    </div>-->
  </section>
</template>

<script type="text/ecmascript-6">
  export default{
    name: 'cooperation'
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .cooperation
    background: #fff
    .logo
      padding-top: 20px
      width: 60%
      margin: 0 auto
    .form-container
      padding: 15px
      .form-line
        display: flex
        margin: 10px 0
        padding-left: 5px
        align-items: center
        border: 1px solid #fabe00
        .input
          padding: 5px
</style>
