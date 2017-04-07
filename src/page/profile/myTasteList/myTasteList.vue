<template>
  <section class="myTasteList" v-if="userInfo">
    {{ userInfo.myTasteList.length }}
  </section>
</template>

<script type="text/ecmascript-6">
  export default{
    name: 'myTasteList',
    props: {
      userInfo: {
        type: Object
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
