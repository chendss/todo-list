<style lang="scss">
.icon-box {
  @include inline-flex();
  .font-16 {
    font-size: 16px;
  }
}
</style>

<template>
  <div class="icon-box"
    v-touch:tap="iconClick">
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
      const name = get(this, 'icon', '')
      if (name.includes('el-icon')) {
        return name + ' font-16'
      } else {

        return 'iconfont ' + name
      }
    }
  },
  methods: {
    iconClick () {
      this.$emit('click')
    }
  },
}
</script>