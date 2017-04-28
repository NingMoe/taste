<template>
  <div id="app">
    <router-view :appData="appData" :pageSize="pageSize"></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'app',
    data () {
      return {
        appData: {},
        pageSize: {
          taste: 2,
          goods: 2,
          myActivityList: 2,
          myReportList: 2
        }
      }
    },
    mounted () {
      // this.$http.get('/static/mock/appData.json').then((res) => {
      this.$http.get('/web/appInitData').then((res) => {
        if (res.body === 'unlogin') {
          // this.$router.replace({path: '/web/wxOauth?url=' + encodeURI(window.location.href)})
          window.location.href = '/web/wxOauth?url=' + encodeURI(window.location.href)
        }
        this.appData = res.body
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import 'common/css/common.css'
</style>
