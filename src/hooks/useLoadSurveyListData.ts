import { useRequest } from 'ahooks'
import { useSearchParams } from 'react-router-dom'
import { LIST_SEARCH_PARAM_KEY } from 'src/constants'
import { surveysAPI } from 'src/service/survey'

type OptionType = {
  isStar: boolean
  isDeleted: boolean
}

const useLoadSurveyList = (opt: Partial<OptionType>) => {
  const [searchParams] = useSearchParams()

  const { data, loading } = useRequest(
    async () => {
      const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || undefined
      const { isStar, isDeleted } = opt

      const data = await surveysAPI.list({
        keyword,
        isStar, // undefined url参数不拼接
        isDeleted,
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
