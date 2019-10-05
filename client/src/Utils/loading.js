import { Loading } from 'element-ui'

class MyLoading {
	constructor() {
		this.loadingInstance = null
		this.n = 0
	}
	open = (...args) => {
		this.loadingInstance = Loading.service(...args)
		this.n++
	}
	close = () => {
		this.n--
		this.n = Math.max(0, this.n)
		if (this.n === 0) {
			this.loadingInstance.close()
		}
	}
}

export default MyLoading
