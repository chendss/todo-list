<template>
  <div class="list-header">
    <p>欢迎来到 TO DO {{name||''}}</p>
    <div class="search-box">
      <div class="search">
        <Icon icon="icon-sousuo"
          class="icon"></Icon>
        <EleInput class="search-text"
          placeholder="搜索"
          @change="searchChange"
          v-model="searchText"></EleInput>
      </div>
    </div>
    <div class="user-control">
      <Dropdown class="user-avatar"
        @command="dropCommand">
        <img :src="imgSrc">
        <DropdownMenu slot="dropdown">
          <DropdownItem command="out">退出</DropdownItem>
          <DropdownItem command="update">更新token</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  </div>
</template>

<script src="./listHeader.js"></script>
<style lang="scss" src="./listHeader.scss"></style>