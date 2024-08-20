import { useRequest } from 'ahooks'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { surveysAPI } from 'src/service/survey'
import { resetComponents } from 'src/store/componentsReducer'

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
    const { componentList = [] } = data.data
    // 把componentList存储到 Redux store 中
    dispatch(resetComponents({ componentList, selectedId: '' }))
  }, [data])

  useEffect(() => {
    run(id)
  }, [id])

  return { loading, error }
}

export default useLoadSurveyData
