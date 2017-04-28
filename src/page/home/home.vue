<template>
  <router-view :pageSize="pageSize" :tasteList="appData.tasteList" :carousels="appData.carousels" :userInfo="appData.userInfo" :nowDate="appData.nowDate"></router-view>
</template>

<script type="text/ecmascript-6">
  export default{
    name: 'home',
    props: {
      appData: {
        type: Object
      },
      pageSize: {
        type: Object
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
