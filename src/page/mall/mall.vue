<template>
  <router-view :userInfo="appData.userInfo" :goodsList="appData.goodsList"></router-view>
</template>

<script type="text/ecmascript-6">
  export default{
    name: 'mall',
    props: {
      appData: {
        type: Object
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
