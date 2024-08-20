import { useRequest } from 'ahooks'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { surveysAPI } from 'src/service/survery'
import { resetComponents } from 'src/store/componentsReducer'
import { resetPageInfo } from 'src/store/pageInfoReducer'

function useLoadSurveyData() {
  const { id = '' } = useParams()
  const dispatch = useDispatch()

  const { data, loading, error, run } = useRequest(
    async (id: string) => {
      if (!id) throw new Error('当前问卷id不存在')
      const data = await surveysAPI.show(id)
      return data
    },
    {
      manual: true,
    }
  )

  useEffect(() => {
    if (!data) return
    const { title = '', componentList = [] } = data.data
    // 把componentList存储到 Redux store 中
    dispatch(resetComponents({ componentList }))

    // 把pageInfo存储到 redux store中
    dispatch(resetPageInfo(title))
  }, [data])

  useEffect(() => {
    run(id)
  }, [id])

  return { loading, error }
}

export default useLoadSurveyData
