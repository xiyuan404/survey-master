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
  // Partial<Pick<SearchOptions, 'isDeleted' | 'isStar'>>;
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
  // 获取（查询）问卷列表
  list: async (opt: Partial<SearchOptions>): Promise<ResDataType> => {
    const data = (await instance.get(BASE_URL, { params: opt })) as ResDataType
    return data
  },
  // 复制单个问卷
  duplicate: async (id: string): Promise<ResDataType> => {
    const data = (await instance.post(BASE_URL + 'duplicate/' + id)) as ResDataType
    return data
  },
  // 批量删除怎么写？符合restfulAPI的命名规范
  deleteBatch: async (ids: string[]): Promise<ResDataType> => {
    const data = (await instance.delete(BASE_URL, { data: ids })) as ResDataType
    return data
  },
}
