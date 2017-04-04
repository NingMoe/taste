<template>
  <div id="app">
    <router-view :tasteList="tasteList" :goodsList="goodsList"></router-view>
    <v-nav></v-nav>
  </div>
</template>

<script>
import vNav from './components/nav/nav'

export default {
  name: 'app',
  data () {
    return {
      tasteList: [],
      goodsList: []
    }
  },
  mounted () {
    this.$http.get('api/tasteList').then((res) => {
      this.tasteList = res.body
    })
    this.$http.get('api/goodsList').then((res) => {
      this.goodsList = res.body
    })
  },
  components: {
    vNav
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
