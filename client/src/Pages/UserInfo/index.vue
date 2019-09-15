<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">后台管理系统</div>
      <Form :model="param"
        :rules="rules"
        ref="login"
        label-width="0px"
        class="ms-content">
        <FormItem prop="username">
          <ElementInput v-model="param.username"
            placeholder="username">
            <Icon slot="prepend"
              icon="icon-yidiandiantubiao08"></Icon>
          </ElementInput>
        </FormItem>
        <FormItem prop="password">
          <ElementInput type="password"
            placeholder="password"
            v-model="param.password"
            @keyup.enter.native="submitForm()">
            <Icon slot="prepend"
              icon="icon-suo"></Icon>
          </ElementInput>
        </FormItem>
        <div class="login-btn">
          <Button type="primary"
            @click="submitForm()">登录</Button>
        </div>
        <p class="login-tips">Tips : 用户名和密码随便填。</p>
      </Form>
    </div>
  </div>
</template>

<style lang="scss" scoped src="./userInfo.scss"></style>
<script src="./userInfo.js"></script>