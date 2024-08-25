import instance, { ResDataType } from './ajax'

export const statAPI = {
  getSurveyStatList: async (surveyId: string, opt: { page: number; pageSize: number }) => {
    const url = `stat/${surveyId}`
    const data = (await instance.get(url, { params: opt })) as ResDataType
    return data
  },
}
