<template>
  <div id="app">
    <router-view :appData="appData"></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'app',
  data () {
    return {
      appData: {}
    }
  },
  mounted () {
    this.$http.get('/api/getAppData').then((res) => {
      this.appData = res.body
    })
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import './common/common.css';

</style>
