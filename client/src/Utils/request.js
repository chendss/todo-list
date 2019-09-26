import axios from 'axios'
import { get, DB } from './index'
import { Message } from 'element-ui'
import Loading from './loading'
import route from '@/Route/index'

const loading = new Loading()
const Info = Message

const interceptorsErr = err => {
  // 对响应错误做些什么
  const response = get(err, 'response', { status: -500 })
  const body = get(response, 'data', null)
  const status = get(response, 'status', 200)
  let result = {
    data: {
      msg: get(body, 'msg', '未知的错误')
    },
    success: false,
    status: response.status,
  }
  if (status === 401) {
    DB.clear()
    route.goHome()
  }
  if (body != null) {
    result = body
  }
  return Promise.resolve({ data: result })
}

axios.interceptors.response.use(
  response => {
    return response
  },
  interceptorsErr
)

const request = function (method, url, data) {
  const config = {
    url,
    method,
    baseURL: 'http://127.0.0.1:6382',
    timeout: 6000
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
  loading.open()
  let result = await request('get', url, params)
  const body = get(result, 'data', {})
  const { data, success } = body
  loading.close()
  if (success === false) {
    const { msg } = data
    const info = msg || '未知错误'
    Info.error(info)
    throw { info, result, url, method: 'get' }
  }
  return data
}

export const POST = async function (url, requestData) {
  loading.open()
  let result = await request('post', url, requestData)
  const body = get(result, 'data', {})
  const { data, success } = body
  loading.close()
  if (success === false || success == null) {
    const { msg } = data
    const info = msg || '未知错误'
    Info.error(info)
    throw { info, result, url, method: 'post' }
  }
  return data
}
