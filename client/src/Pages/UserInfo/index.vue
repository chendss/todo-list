<template>
  <div class='user-info-box'>
    <img src='@img/register-background.jpg'>
    <div class="content">
      <div class="inner">
        <img class="logo"
          src="@img/microsoft_logo.svg">
        <p class="login-title">{{text}}</p>
        <div class="user-box">
          <input id="user"
            class="input"
            placeholder='请输入账号'
            v-model="user"
            type="email"
            maxlength="113">
        </div>
        <div class="pwd-box">
          <input id="pwd"
            class="input"
            placeholder='请输入密码'
            type="password"
            maxlength="113">
        </div>
        <div class="confirm-pwd-box"
          v-if="type==='register'">
          <input id="confirm-pwd"
            class="input"
            placeholder='请确认密码'
            type="password"
            maxlength="113">
        </div>
        <div class="login-btn">{{text}}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped src="./userInfo.scss"></style>
<script src="./userInfo.js"></script>