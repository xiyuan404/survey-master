/**
 * @description 抽离出可复用加载问卷详情信息逻辑
 * 页面加载时默认获取，页面路径参数改变后会重新获取
 */

import { useRequest } from 'ahooks'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { surveysAPI } from 'src/service/survey'
import { resetComponents } from 'src/store/componentsReducer'
import { resetPageInfo } from 'src/store/pageInfoReducer'

function useLoadSurveyData() {
  const { id = '' } = useParams()
  const dispatch = useDispatch()

  const { data, loading, error, run } = useRequest(
    async (id: string) => {
      if (!id) throw new Error('当前问卷id不存在')
      const data = await surveysAPI.get(id)
      return data
    },
    {
      manual: true,
    }
  )

  useEffect(() => {
    if (!data) return

    const { componentList = [], css = '', js = '', title = '', desc = '', isPublished } = data

    let selectedId = ''
    if (componentList.length > 0) {
      selectedId = componentList[0].fe_id
    }
    // 把componentList存储到 Redux store 中
    dispatch(resetComponents({ componentList, selectedId, copiedComponentInfo: null }))

    // 把pageInfo存储到Redux store中
    dispatch(resetPageInfo({ css, js, title, desc, isPublished }))
  }, [data])

  useEffect(() => {
    run(id)
  }, [id])

  return { loading, error }
}

export default useLoadSurveyData
