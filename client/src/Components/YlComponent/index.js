
import Vue from 'vue'

export default class BaseVue extends Vue {
  constructor(props, context) {
    super(props, context)
    this.methods = this.methodDict
    console.log('eee', this.methods)
  }
}