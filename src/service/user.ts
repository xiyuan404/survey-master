import instance, { ResDataType } from './ajax'

export const UserAPI = {
  get: async () => {
    const data = (await instance.get('/api/auth/profile')) as ResDataType
    return data
  },
  register: async (username: string, password: string): Promise<ResDataType> => {
    const body = { username, password }

    const data = (await instance.post('/api/users/register', body)) as ResDataType
    return data
  },
  login: async (username: string, password: string): Promise<ResDataType> => {
    const body = { username, password }
    const data = (await instance.post('/api/auth/login', body)) as ResDataType
    return data
  },
}
