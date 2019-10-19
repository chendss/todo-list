<template>
  <div class="list-box">
    <ListHeader :EventEmitter="EventEmitter"
      class="header-list"
      :title="title"></ListHeader>
    <div class="content"
      :style="`height:${containerHeight}px`">
      <ListSideBar class="side-bar"
        :EventEmitter="EventEmitter"
        :title="title"></ListSideBar>
      <ListContent class="content-list"
        :id="listId"
        :title="listName"
        :EventEmitter="EventEmitter"></ListContent>
    </div>
  </div>
</template>

<style lang="scss" scoped src="./list.scss"></style>
<script src="./list.js"></script>