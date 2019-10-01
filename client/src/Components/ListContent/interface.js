import { GET, POST } from '@/Utils/request'

export const getLog = async function (id) {
  let logs = await GET(`/getLog/${encodeURIComponent(id)}`)
  return logs
}

export const addLog = async function (id, data) {
  return POST(`/addLog/${encodeURIComponent(id)}`, data)
}

export const writeLog = async function (logId, data) {
  return POST(`/changeLog/${encodeURIComponent(logId)}`, data)
}