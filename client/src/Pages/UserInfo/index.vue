<template>
  <div class="user-wrap">
    <div class="ms-user">
      <div class="ms-title">简单 TODO</div>
      <Form :model="param"
        :validate-on-rule-change='true'
        :rules="rules"
        ref="user"
        label-width="0px"
        class="ms-content">
        <FormItem prop="username">
          <ElementInput v-model="param.username"
            placeholder="请输入用户名">
            <Icon slot="prepend"
              icon="icon-yidiandiantubiao08"></Icon>
          </ElementInput>
        </FormItem>
        <FormItem prop="password">
          <ElementInput type="password"
            placeholder="请输入密码"
            v-model="param.password"
            @keyup.enter.native="submitForm()">
            <Icon slot="prepend"
              icon="icon-suo"></Icon>
          </ElementInput>
        </FormItem>
        <FormItem prop="confirmPassword"
          v-if="type!=='login'">
          <ElementInput type="password"
            placeholder="请确认密码"
            v-model="param.confirmPassword"
            @keyup.enter.native="submitForm()">
            <Icon slot="prepend"
              icon="icon-suo"></Icon>
          </ElementInput>
        </FormItem>
        <div class="user-btn">
          <Button type="primary"
            id="userInfo"
            @click="submitForm()">{{type==='login'?'登录':'注册'}}</Button>
        </div>
        <div class="footer">
          <p class="user-tips">Tips : 请输入用户名和密码。</p>
          <Icon :icon='type==="login"?"icon-zhuce":"icon-yidiandiantubiao08"'
            v-touch:tap="userChange"
            :title="type==='login'?'注册':'登录'"
            class="user-change"></Icon>
        </div>
      </Form>
    </div>
  </div>
</template>

<style lang="scss" scoped src="./userInfo.scss"></style>
<script src="./userInfo.js"></script>