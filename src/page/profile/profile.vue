<template>
  <router-view :appData="appData" :pageSize="pageSize"></router-view>
</template>

<script type="text/ecmascript-6">
  export default{
    name: 'profile',
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
