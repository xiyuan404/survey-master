import instance, { ResDataType } from './ajax'

const USER_URL = '/user/'

export const UserAPI = {
  get: async () => {
    const data = (await instance.get(USER_URL + 'info')) as ResDataType
    return data
  },
  register: async (username: string, password: string, nickname: string): Promise<ResDataType> => {
    const body = { username, password, nickname: nickname || username }

    const data = (await instance.post(USER_URL + 'register', body)) as ResDataType
    return data
  },
  login: async (username: string, password: string): Promise<ResDataType> => {
    const body = { username, password }
    const data = (await instance.post(USER_URL + 'info', body)) as ResDataType
    return data
  },
}