import { message } from 'antd'
import axios, { InternalAxiosRequestConfig } from 'axios'
import { getToken } from 'src/utils/userToken'

export type ResDataType = {
  [key: string]: any
}
const instance = axios.create({
  timeout: 10 * 1000,
  baseURL: '/api',
})

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    config.headers['Authorization'] = 'Bearer ' + getToken()
    return config
  },
  err => Promise.reject(err)
)

instance.interceptors.response.use(response => {
  // if (response.data && !response.data.errCode) {
  if (response.data) {
    const result = response.data as ResDataType
    const { errno, data, msg } = result
    if (errno !== 0) {
      if (msg) {
        message.error(msg)
      }
      throw new Error(response.statusText || 'response failed with status code:' + response.status)
    }
    return data as any
  } else {
    throw new Error(response.statusText || 'response failed with status code: ' + response.status)
  }
})

export default instance
