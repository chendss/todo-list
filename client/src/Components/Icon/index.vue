<style lang="scss">
.icon-box {
  @include inline-flex();
}
</style>

<template>
  <div class="icon-box"
    @click="iconClick">
    <i :class="iconName"></i>
  </div>
</template>

<script>
import { get } from '@utils/index.js'

export default {
  props: ['icon'],
  data () {
    return {
    }
  },
  computed: {
    iconName () {
      return 'iconfont ' + get(this, 'icon', '')
    }
  },
  methods: {
    iconClick () {
      this.$emit('click')
    }
  },
}
</script>