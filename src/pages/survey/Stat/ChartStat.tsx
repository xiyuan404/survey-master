import { useRequest } from 'ahooks'
import React, { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { statAPI } from 'src/service/stat'

type PropsType = {
  selectedComponentId: string
  selectedComponentType: string
}

const ChartStat: FC<PropsType> = (props: PropsType) => {
  const { selectedComponentId } = props

  const { id: surveyId } = useParams()

  const [stat, setStat] = useState([])

  const { run } = useRequest(
    async (surveyId, selectedComponentId) => {
      const data = await statAPI.getComponentStat(surveyId, selectedComponentId)
      return data
    },
    {
      manual: true,
      onSuccess(data) {
        const { stat } = data
        setStat(stat)
      },
    }
  )

  // 每次选中组件改变，触发重新请求对应图表统计数据
  useEffect(() => {
    run(surveyId, selectedComponentId)
  }, [selectedComponentId])

  return <div>stat:{JSON.stringify(stat)}</div>
}

export default ChartStat
