<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {
  },
  mounted () {
  },
}
</script>

<style lang="scss">
#app {
  font-family: "Microsoft Yahei UI", "Microsoft Yahei", Verdana, Simsun,
    "Segoe UI", "Segoe UI Web Regular", "Segoe UI Symbol", "Helvetica Neue",
    "BBAlpha Sans", "S60 Sans", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  * {
    border: 0;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
  }
}
</style>
