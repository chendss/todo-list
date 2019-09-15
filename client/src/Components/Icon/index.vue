<style lang="scss">
.icon-box {
  @include inline-flex();
}
</style>

<template>
  <div class="icon-box">
    <i :class="iconName"></i>
  </div>
</template>

<script>
import { get } from '@utils/index.js'

export default {
  props: ['icon'],
  data () {
    return {
      iconName: 'iconfont '
    }
  },
  mounted () {
    this.iconName += get(this, 'icon', '')
  },
}
</script>