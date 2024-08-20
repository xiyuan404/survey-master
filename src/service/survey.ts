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
  update: async (id: string, opt: Partial<SearchOptions>): Promise<ResDataType> => {
    const data = (await instance.patch(surveysURL + id, opt)) as ResDataType
    return data as ResDataType
  },
  show: async (id: string): Promise<ResDataType> => {
    const data = (await instance.get(surveysURL + id)) as ResDataType
    return data
  },
}
