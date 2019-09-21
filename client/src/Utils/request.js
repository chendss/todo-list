import axios from 'axios'
import { get } from './index'
import { Message } from 'element-ui'
import Loading from './loading'

const loading = new Loading()
const Info = Message

axios.interceptors.response.use(
	response => {
		return response
	},
	err => {
		// 对响应错误做些什么
		console.log('发生一个异常', err.response)
		const response = get(err, 'response', { status: -500 })
		const data = get(response, 'data', null)
		if (data != null) {
			const data = get(response, 'data', {})
			return Promise.resolve(data)
		}
		return Promise.resolve({
			success: false,
			status: response.status,
		})
	}
)

const request = function(method, url, data) {
	const config = {
		url,
		method,
		baseURL: 'http://127.0.0.1:6382',
		timeout: 4000,
	}
	if (['post', 'put'].includes(method.toLowerCase())) {
		config.data = data
	} else {
		config.params = data
	}
	return axios(config)
}

export const GET = async function(url, params) {
	loading.open()
	let result = await request('get', url, params)
	const body = get(result, 'data', {})
	const { data, success } = body
	const { msg } = data
	loading.close()
	if (success === false) {
		const info = msg || '未知错误'
		Info.error(info)
		throw { info, result }
	}
	return data
}

export const POST = async function(url, requestData) {
	loading.open()
	let result = await request('post', url, requestData)
	const body = get(result, 'data', {})
	const { data, success } = body
	const { msg } = data
	loading.close()
	if (success === false) {
		const info = msg || '未知错误'
		Info.error(info)
		throw { info, result }
	}
	return data
}
