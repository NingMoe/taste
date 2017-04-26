<template>
  <section class="cooperation">
    <h1 class="common-head">
      合作对接
    </h1>
    <div class="logo img-width">
      <img src="../../../common/images/logo.png" alt="">
    </div>
    <div class="form-container">
      <div class="form-line">
        联系电话: 028-86701038
      </div>
      <div class="form-line">
        公司邮箱: 290477299@qq.com
      </div>
      <div class="form-line">
        公司地址: 成都市红星路二段159号（成都传媒集团）红星国际写字楼3号楼-1813
      </div>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
  export default{
    name: 'cooperation',
    mounted () {
      window.wxConfig()
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .cooperation
    min-height: 100vh
    background: #fff
    .logo
      width: 60%
      margin: 0 auto
      padding: 20px 0
    .form-container .form-line
      line-height: 1.3
      padding: 0 15px 20px 15px
</style>
