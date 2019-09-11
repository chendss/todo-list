import axios from 'axios'

const request = function (method, url, data) {
  const config = {
    url,
    method,
    baseURL: '0.0.0.0:6382',
    timeout: 4000,
  }
  if (['post', 'put'].includes(method.toLowerCase())) {
    config.data = data
  } else {
    config.params = data
  }
  return axios(config)
}

export const GET = async function (url, params) {
  let result = await request('get', url, params)

}

export const POST = async function (url, requestData) {
  let result = await request('post', url, requestData)
  const { data, message, success } = result
  if (success === false) {
  }
}