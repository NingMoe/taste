<template>
  <div id="app">
    <router-view :tasteList="tasteList" :goodsList="goodsList" :userInfo="userInfo"></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  data () {
    return {
      tasteList: [],
      goodsList: [],
      userInfo: {}
    }
  },
  mounted () {
    this.$http.get('api/tasteList').then((res) => {
      this.tasteList = res.body
    })
    this.$http.get('api/goodsList').then((res) => {
      this.goodsList = res.body
    })
    this.$http.get('api/getUserInfo').then((res) => {
      this.userInfo = res.body
    })
  }
}
</script>

<style>
  @import './common/common.css';

</style>
