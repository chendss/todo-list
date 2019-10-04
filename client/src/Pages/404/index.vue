<template>
  <div class="no-found-box">
    <div class="main">
      <div class="avatar"
        v-touch:tap="goBack"
        title="回到首页">
        <img src="@/assets/img/头像.jpg">
      </div>
      <h1>
        <p>404</p>
      </h1>
      <div class="divider"></div>
      <p class="info">对不起，您要找的页面被2B丢失了，(＞人＜；)</p>
      <div class="divider secondary"></div>
      <p class="info">欢迎来到我的清单系统</p>
    </div>
  </div>
</template>

<style lang="scss" scoped src="./404.scss"></style>

<script>
export default {
  methods: {
    goBack () {
      this.$router.push('/')
    }
  },
}
</script>