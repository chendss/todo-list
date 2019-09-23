<template>
  <Menu default-active="1"
    class="side-bar-menu"
    :collapse="!open"
    text-color="#34373d;"
    active-text-color="#2e5cdb">
    <div class="side-action-box">
      <div class="icon-background-box"
        @click="collapse">
        <Icon icon="icon-zhedie"
          class="icon icon-side"></Icon>
      </div>
      <div class="icon-background-box"
        @click="add">
        <Icon icon="el-icon-plus"
          class="icon-plus"></Icon>
      </div>
    </div>
    <MenuItem v-for="(menu, index) in menuList"
      class="menu-item"
      :key="index"
      :index="(index+1)+''">
    <Icon :icon="menu.type==='custom'?'icon-zhedie':menu.icon"
      class="icon icon-item"></Icon>
    <span slot='title'>{{menu.name}}</span>
    </MenuItem>
  </Menu>
</template>

<style lang="scss" scoped src="./listSideBar.scss"></style>
<script src="./listSideBar.js"></script>