import { Loading } from 'element-ui'

class MyLoading {
	constructor() {
		this.loadingInstance = null
	}
	open = (...args) => {
		this.loadingInstance = Loading.service(...args)
	}
	close = () => {
		return new Promise(resolve => {
			setTimeout(() => {
				this.loadingInstance.close()
				resolve()
			}, 0)
		})
	}
}

export default MyLoading
