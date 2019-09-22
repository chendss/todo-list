<template>
  <div class="list-side-bar">
    <Menu default-active="1"
      class="side-bar-menu"
      @open="handleOpen"
      @close="handleClose"
      :collapse="!open"
      text-color="#34373d;"
      active-text-color="#2e5cdb">
      <div class="side-icon-box">
        <div class="icon-background-box"
          @click="collapse">
          <Icon icon="icon-zhedie"
            class="icon"></Icon>
        </div>
      </div>
      <Submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <MenuItemGroup>
          <template slot="title">分组一</template>
          <MenuItem index="1-1">选项1</MenuItem>
          <MenuItem index="1-2">选项2</MenuItem>
        </MenuItemGroup>
        <MenuItemGroup title="分组2">
          <MenuItem index="1-3">选项3</MenuItem>
        </MenuItemGroup>
        <Submenu index="1-4">
          <template slot="title">选项4</template>
          <MenuItem index="1-4-1">选项1</MenuItem>
        </Submenu>
      </Submenu>
      <MenuItem index="2">
      <i class="el-icon-menu"></i>
      <span slot="title">导航二</span>
      </MenuItem>
      <MenuItem index="3"
        disabled>
      <i class="el-icon-document"></i>
      <span slot="title">导航三</span>
      </MenuItem>
      <MenuItem index="4">
      <i class="el-icon-setting"></i>
      <span slot="title">导航四</span>
      </MenuItem>
    </Menu>
  </div>
</template>

<style lang="scss" scoped src="./listSideBar.scss"></style>
<script src="./listSideBar.js"></script>