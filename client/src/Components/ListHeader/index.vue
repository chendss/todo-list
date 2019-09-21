<template>
  <div class="list-header">
    <p>TO DO</p>
    <div class="search-box">
      <div class="search">
        <Icon icon="icon-sousuo"
          class="icon"></Icon>
        <EleInput class="search-text"
          placeholder="搜索"
          v-model="searchText"></EleInput>
      </div>
    </div>
    <div class="user-control">
      <div class="user-avatar"></div>
    </div>
  </div>
</template>

<script src="./listHeader.js"></script>
<style lang="scss" src="./listHeader.scss"></style>