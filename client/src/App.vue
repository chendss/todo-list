<template>
  <div id="app"
    class="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { updateToken } from '@utils/request.js'

export default {
  name: 'app',
  components: {
  },
  created () {
    updateToken()
  },
}
</script>
<style lang="scss">
.app {
  height: 100vh;
}
</style>