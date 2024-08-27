import { get } from './ajax'

export const getSurveyInfoById = async (id: string) => {
  // 地址栏中拿到id拼接服务端URL
  const url = `/api/surveys/${id}`

  const data = await get(url)
  return data
}
