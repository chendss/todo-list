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
      <div class="user-avatar">
        <img :src="imgSrc" @click="updateToken">
      </div>
    </div>
  </div>
</template>

<script src="./listHeader.js"></script>
<style lang="scss" src="./listHeader.scss"></style>