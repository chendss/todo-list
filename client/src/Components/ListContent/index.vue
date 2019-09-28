<template>
  <div class="list-content">
    <div class="title-box">
      <h1>{{title||'暂无'}}</h1>
      <div class="p-siff">
        <p>...</p>
      </div>
    </div>
    <div class="main-list-box">
      <div class="tasks">
        <div class="task"></div>
      </div>
      <div class="add-task"></div>
      <div class="backgroundLines"></div>
    </div>
  </div>
</template>

<script src="./listContent.js"></script>
<style lang="scss" scoped src="./listContent.scss"></style>