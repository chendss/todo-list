<template>
  <div class="list-content"
    v-if="!!id">
    <div class="title-box">
      <h1>{{title||'暂无'}}</h1>
      <div class="p-siff">
      </div>
    </div>
    <div class="main-list-box">
      <div class="tasks">
        <div class="task"
          v-for="(task, index) in thatTasks"
          :key="index">
          <div :class="`${!task.status?'yuan':'check'}`"
            @click="changeLog(index,'collection',!task.collection)">
          </div>
          <div class="task-text">{{task.content}}</div>
          <Icon class="star"
            :icon="task.collection?'el-icon-star-on':'el-icon-star-off off'"></Icon>
        </div>
      </div>
      <div class="add-task">
        <Icon class="add"
          icon="el-icon-plus"
          v-if="!addFocus"></Icon>
        <div class="yuan"
          v-if="addFocus">
        </div>
        <input :class="`${addFocus?'add-text focus':'add-text'}`"
          v-model="text"
          @blur="()=>focusChange(false)"
          @focus="()=>focusChange(true)"
          @keypress="addTask"
          placeholder="添加任务">
      </div>
    </div>
    <div class="backgroundLines"></div>
  </div>
</template>

<script src="./listContent.js"></script>
<style lang="scss" scoped src="./listContent.scss"></style>