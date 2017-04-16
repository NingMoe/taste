<template>
  <router-view :appData="appData"></router-view>
</template>

<script type="text/ecmascript-6">
  export default{
    name: 'profile',
    props: {
      appData: {
        type: Object
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
