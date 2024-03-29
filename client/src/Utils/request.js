import axios from 'axios'
import { get, DB } from './index'
import { Message } from 'element-ui'
import route from '@/Route/index'
import Loading from './loading'
import { cloneDeep } from 'lodash'

const Info = Message
const CancelTOken = axios.CancelToken
const source = CancelTOken.source()
const { href, protocol, hostname } = window.location

const apiRequest = {
  production: !href.includes('https') ? 'http://d.bjong.me:6382' : 'https://listServer.rainys.me:2',
  development: href.includes('localhost') ? 'http://127.0.0.1:6382' : `${protocol}//${hostname}:6382`,
}

const interceptorsErr = function (err) {
  // 对响应错误做些什么
  const { message } = JSON.parse(JSON.stringify(err))
  let newWorkMsg = null
  if (message.includes('Network')) {
    newWorkMsg = '不知道是后端爆炸了，还是网络爆炸了'
  }
  const response = get(err, 'response', { status: -500 })
  const status = get(response, 'status', 200)
  const url = get(err, 'config.url', '')
  const requestData = get(err, 'config.data', '')
  let result = get(response, 'data', {
    data: {
      msg: newWorkMsg || `接口报错,地址为 ${url},参数为 ${requestData}`,
    },
    success: false,
    status: response.status,
  })
  if (status === 401) {
    DB.clear()
    route.goHome()
  }
  if (process.env.NODE_ENV === 'development') {
    const errStr = JSON.stringify(err)
    console.log('报错', errStr)
    alert(errStr)
  }
  Loading.close()
  return Promise.resolve({ data: result })
}

axios.interceptors.response.use(response => {
  return response
}, interceptorsErr)

const request = function (method, url, data) {
  const config = {
    url,
    method,
    timeout: 6000,
    cancelToken: source.token,
    baseURL: apiRequest[process.env.NODE_ENV],
  }
  if (['post', 'put'].includes(method.toLowerCase())) {
    config.data = data
  } else {
    config.params = data
  }
  const token = get(DB.get('token'), 'token', null)
  if (token != null) {
    config.headers = { token }
  }
  return axios(config)
}

export const updateToken = async function () {
  const token = get(DB.get('token'), 'token', null)
  if (token != null) {
    let nextToken = await GET('/upToken')
    DB.set('token', { token: nextToken })
    return true
  }
  route.goHome()
  return false
}

export const GET = async function (url, params) {
  let result = await request('get', url, params)
  const body = get(result, 'data', {})
  const { data, success } = body
  if (success === false) {
    const { msg } = data
    const info = msg || '未知错误'
    Info.error(info)
    throw { info, result, url, method: 'get' }
  }
  return data
}

export const POST = async function (url, requestData) {
  let result = await request('post', url, requestData)
  const body = get(result, 'data', {})
  const { data, success } = body
  if (success === false || success == null) {
    const { msg } = data
    const info = msg || '未知错误'
    Info.error(info)
    throw { info, result, url, method: 'post' }
  }
  return data
}
