import { GET, POST } from '@utils/request'

export const getMenu = async function () {
  let list = await GET('/list')
  return list
}

export const addMenu = function (data) {
  return POST('/addList', data)
}