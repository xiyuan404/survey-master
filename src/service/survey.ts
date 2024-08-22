import instance, { ResDataType } from './ajax'

type SearchOptions = {
  keyword: string
  isStar: boolean
  isDeleted: boolean
  page: number
  pageSize: number
}

// Pick<SearchOptions, keyof SearchOptions>

const surveysURL = '/surveys/'

export const surveysAPI = {
  // 更新单个问卷
  update: async (id: string, opt: { [key: string]: any }): Promise<ResDataType> => {
    const data = (await instance.patch(surveysURL + id, opt)) as ResDataType
    return data as ResDataType
  },
  // 查询单个问卷信息
  get: async (id: string): Promise<ResDataType> => {
    const data = (await instance.get(surveysURL + id)) as ResDataType
    return data
  },
}
