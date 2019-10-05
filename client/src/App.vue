<template>
  <div id="app"
    class="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {
  },
  created () {
  },
}
</script>
<style lang="scss">
.app {
  height: 100%;
  width: 100vw;
}
</style>