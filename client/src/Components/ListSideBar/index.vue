<template>
  <Menu :style="height?`height:${height}px`:''"
    :class="`side-bar-menu ${classId}`"
    :collapse="!open"
    @select="onSelect"
    :default-active="this.active"
    text-color="#34373d;"
    active-text-color="#2e5cdb">
    <div class="side-action-box">
      <div class="icon-background-box"
        v-touch:tap="collapse">
        <Icon icon="icon-zhedie"
          class="icon icon-side"></Icon>
      </div>
      <div class="icon-background-box"
        @click="add" :style="!open?'pointer-events:none;opacity:0':''">
        <Icon icon="el-icon-plus"
          class="icon-plus"></Icon>
      </div>
    </div>
    <MenuItem v-for="(menu, index) in menuList"
      class="menu-item"
      :key="menu.id"
      :id="menu.id"
      :index="(index+1)+''">
    <Icon :icon="menu.type==='custom'?'el-icon-document':menu.icon"
      class="icon icon-item"></Icon>
    <span slot='title'>{{menu.name}}</span>
    <div class="delete-menu-box"
      v-touch:tap="()=>delMenu(menu.id,menu.name)"
      v-if="open">
      <button class="delete-menu el-icon-delete"></button>
    </div>
    </MenuItem>
  </Menu>
</template>

<style lang="scss" scoped src="./listSideBar.scss"></style>
<script src="./listSideBar.js"></script>