<template>
  <div class="list-content"
    :style="!!id?'opacity:1':'opacity:0'">
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
            v-touch:tap="()=>changeLog(index,'status','bool')">
          </div>
          <input class="task-text"
            @focus="onFocus"
            @blur="()=>changeLog(index,'content')"
            @keypress="()=>changeLog(index,'content')"
            :style="task.status?'text-decoration: line-through;color: #767678;':''"
            v-model="task.content">
          <Button type="danger"
            class="delete"
            :style="$mobile?'opacity:1':''"
            @click="delLog(index)"
            icon="el-icon-delete"
            circle></Button>
          <Icon class="star"
            v-if="!task.status"
            v-touch:tap="()=>changeLog(index,'collection','bool')"
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
          @keypress="addKeypress"
          placeholder="添加任务">
      </div>
    </div>
    <div class="backgroundLines"></div>
  </div>
</template>

<script src="./listContent.js"></script>
<style lang="scss" scoped src="./listContent.scss"></style>