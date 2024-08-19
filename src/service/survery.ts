import instance, { ResDataType } from './ajax'

type SearchOptions = {
  keyword: string
  isStar: boolean
  isDeleted: boolean
  page: number
  pageSize: number
}

// Pick<SearchOptions, keyof SearchOptions>

const surveysURL = '/api/surveys/'

export const surveyService = {
  update: async (id: string, opt: Partial<SearchOptions>): Promise<ResDataType> => {
    const data = (await instance.patch(surveysURL + id, opt)) as ResDataType
    return data as ResDataType
  },
}
