import instance, { ResDataType } from './ajax'

export const statAPI = {
  getSurveyStatList: async (
    surveyId: string,
    opt: { page: number; pageSize: number }
  ): Promise<ResDataType> => {
    const url = `/api/stat/${surveyId}`
    const data = (await instance.get(url, { params: opt })) as ResDataType
    return data
  },

  // 获取组件统计数据
  getComponentStat: async (surveyId: string, componentId: string): Promise<ResDataType> => {
    const url = `/api/stat/${surveyId}/${componentId}`
    const data = (await instance.get(url)) as ResDataType
    return data
  },
}
