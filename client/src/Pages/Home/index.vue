<template>
  <div class='home-box'>
    <div class="context-left">
      <img src="@img/logo.svg">
      <h1 class="title">Microsoft To-Do</h1>
      <p class="detail">从工作到休闲，To-Do 都是日常完成任务的最简便方式。</p>
      <div class="login"
        v-touch:tap="login">
        登录
      </div>
      <div class="register"
        v-touch:tap="register">
        没有帐户? 请免费注册
      </div>
    </div>
    <footer class="footer"
      v-if="!$mobile">
      <img :src="$config.background">
    </footer>
  </div>
</template>

<style lang="scss" scoped src="./home.scss"></style>
<script src="./home.js"></script>