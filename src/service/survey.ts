import instance, { ResDataType } from './ajax'

type SearchOptions = {
  keyword: string
  isStar: boolean
  isDeleted: boolean
  page: number
  pageSize: number
}

// Pick<SearchOptions, keyof SearchOptions>

const BASE_URL = '/surveys/'

export const surveysAPI = {
  // 更新单个问卷
  update: async (id: string, opt: { [key: string]: any }): Promise<ResDataType> => {
    const data = (await instance.patch(BASE_URL + id, opt)) as ResDataType
    return data
  },
  // 查询单个问卷信息
  get: async (id: string): Promise<ResDataType> => {
    const data = (await instance.get(BASE_URL + id)) as ResDataType
    return data
  },
  // 创建问卷
  create: async (): Promise<ResDataType> => {
    const data = (await instance.post(BASE_URL)) as ResDataType
    return data
  },
}
