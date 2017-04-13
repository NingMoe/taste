<template>
  <router-view :tasteList="appData.tasteList" :carousels="appData.carousels"></router-view>
</template>

<script type="text/ecmascript-6">
  export default{
    name: 'home',
    props: {
      appData: {
        type: Object
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
