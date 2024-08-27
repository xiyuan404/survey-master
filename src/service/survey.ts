import instance, { ResDataType } from './ajax'

type SearchOptions = {
  keyword: string
  isStar: boolean
  isDeleted: boolean
  page: number
  pageSize: number
}

// Pick<SearchOptions, keyof SearchOptions>

export const surveysAPI = {
  // 更新单个问卷
  // Partial<Pick<SearchOptions, 'isDeleted' | 'isStar'>>;
  update: async (id: string, opt: { [key: string]: any }): Promise<ResDataType> => {
    const url = '/api/surveys/' + id

    const data = (await instance.patch(url, opt)) as ResDataType
    return data
  },
  // 查询单个问卷信息
  get: async (id: string): Promise<ResDataType> => {
    const url = '/api/surveys/' + id

    const data = (await instance.get(url)) as ResDataType
    return data
  },
  // 创建问卷
  create: async (): Promise<ResDataType> => {
    const url = '/api/surveys'

    const data = (await instance.post(url)) as ResDataType
    return data
  },
  // 获取（查询）问卷列表
  list: async (opt: Partial<SearchOptions>): Promise<ResDataType> => {
    const url = '/api/surveys'
    const data = (await instance.get(url, { params: opt })) as ResDataType
    return data
  },
  // 复制单个问卷
  duplicate: async (id: string): Promise<ResDataType> => {
    const url = `/api/surveys/duplicate/${id}`

    const data = (await instance.post(url)) as ResDataType
    return data
  },
  // 批量删除
  deleteBatch: async (ids: string[]): Promise<ResDataType> => {
    const url = `/api/surveys`

    const data = (await instance.delete(url, { data: ids })) as ResDataType
    return data
  },
}
