import { useRequest } from 'ahooks'
import { useSearchParams } from 'react-router-dom'
import { LIST_SEARCH_PARAM_KEY } from 'src/constants'
import { surveysAPI } from 'src/service/survey'

const useLoadSurveyList = () => {
  const [searchParams] = useSearchParams()

  const { data, loading } = useRequest(
    async () => {
      const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
      const data = await surveysAPI.list({
        keyword,
      })
      return data
    },
    {
      refreshDeps: [searchParams], // 刷新（重新请求）的依赖项
    }
  )

  return { data, loading }
}

export default useLoadSurveyList
