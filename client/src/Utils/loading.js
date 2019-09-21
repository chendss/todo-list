import { Loading } from 'element-ui'

class MyLoading {
	constructor() {
		this.loadingInstance = null
	}
	open = (...args) => {
		this.loadingInstance = Loading.service(...args)
	}
	close = () => {
		setTimeout(() => {
			this.loadingInstance.close()
		}, 10)
	}
}

export default MyLoading
