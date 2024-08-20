import axios, { InternalAxiosRequestConfig } from 'axios'

export type ResDataType = {
  [key: string]: any
}
const instance = axios.create({
  timeout: 10 * 1000,
  baseURL: '/api',
})

// instance.interceptors.request.use(
//   (config: InternalAxiosRequestConfig) => {
//     config.headers!.Authorization = 'Bearer '
//     return config
//   },
//   err => Promise.reject(err)
// )

instance.interceptors.response.use(response => {
  // if (response.data && !response.data.errCode) {
  if (response.data) {
    return response.data
  } else {
    throw new Error(response.data.message || 'response failed with status code: ' + response.status)
  }
})

export default instance
