import Vue from 'vue'

/**
 * 消息弹出函数
 *
 */
export const message = function() {
	Vue.prototype.$swal(...arguments)
}
