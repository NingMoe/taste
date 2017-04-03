<template>
  <div class="nav">
    <ul>
      <li>
        <router-link to="/face" class="nav-item nav-face">
          <i class="icon"></i>
          <span>体验中心</span>
        </router-link>
      </li>
      <li>
        <router-link to="/mall" class="nav-item nav-mall">
          <i class="icon"></i>
          <span>积分商城</span>
        </router-link>
      </li>
      <li>
        <router-link to="/profile" class="nav-item nav-profile">
          <i class="icon"></i>
          <span>个人中心</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    name: 'vNav'
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

  .nav
    position: fixed
    left: 0
    right: 0
    bottom: 0
    height: 40px
    font-size: 10px
    text-align: center
    border-top: 1px solid #ccc
    background: #ffffff
    ul
      display: flex
      height: 100%
      li
        flex: 1
        border-right:1px solid #ccc
        .nav-item
          display: block
          height: 100%
          padding-top: 4px
          i
            display: block
            height: 18px
            margin-bottom: 4px
        .nav-face i
          background: url("./img/nav-face-off.png") no-repeat center
          background-size: 18px auto
        .nav-mall i
          background: url("./img/nav-mall-off.png") no-repeat center
          background-size: 18px auto
        .nav-profile i
          background: url("./img/nav-profile-off.png") no-repeat center
          background-size: 18px auto
        .nav-face.router-link-active i
          background: url("./img/nav-face-on.png") no-repeat center
          background-size: 18px auto
        .nav-mall.router-link-active i
          background: url("./img/nav-mall-on.png") no-repeat center
          background-size: 18px auto
        .nav-profile.router-link-active i
          background: url("./img/nav-profile-on.png") no-repeat center
          background-size: 18px auto
      li:last-child
        border-right: 0


</style>
