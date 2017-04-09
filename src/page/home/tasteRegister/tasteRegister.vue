<template>
  <section class="tasteRegister">
    <h1>{{ tasteData.title }}</h1>
    <div class="info">{{ tasteData.author }}  {{ tasteData.addTime }}</div>
    <div class="rules">
      <header><img src="../tasteDetails/rules-title.png" alt=""></header>
      <div class="rules-content">{{ tasteData.rules }}</div>
    </div>
    <div class="form-container">
      <header><img src="./form-title.png" alt=""></header>
      <form action="">
        <div>
          <label for="username">姓　　名: </label>
          <input type="text" name="username" id="username">
        </div>
        <div>
          <label for="userphone">联系方式: </label>
          <input type="text" name="userphone" id="userphone">
        </div>
        <div>
          <label for="nums">参加人数: </label>
          <input type="text" name="nums" id="nums">
        </div>
        <div>
          <label>是否驾车: </label>
          <input type="radio" name="usecar">是
          <input type="radio" name="usecar">否
        </div>
      </form>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
  export default{
    name: 'tasteRegister',
    data () {
      return {
        tasteData: {}
      }
    },
    mounted () {
      if (this.$route.params.tasteData) {
        this.tasteData = this.$route.params.tasteData
      } else {
        this.$http.get('/api/getTasteById', {id: this.$route.params.id}).then((res) => {
          this.tasteData = res.body
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .tasteRegister
    padding: 12px 12px 50px 12px
    background: #fff
    h1
      font-size: 18px
      line-height: 1.3
    .info
      margin: 8px 0 15px 0
    .rules
      margin: 25px 5px 25px 0
      padding: 10px 10px 10px 20px
      position: relative
      line-height: 1.4
      border: 1px solid #fabe00
      header img
        width: 90px
        height: auto
      .rules-content
        margin: 15px 0
    .rules:after
      content: ''
      display: block
      height: 100%
      width: 100%
      position: absolute
      left: 5px
      bottom: 5px
      border: 1px solid #fabe00
</style>
