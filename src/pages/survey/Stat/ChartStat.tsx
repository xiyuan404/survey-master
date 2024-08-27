import { useRequest } from 'ahooks'
import React, { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getComponentConfByType } from 'src/components/SurveyComponents'
import { statAPI } from 'src/service/stat'
import { Typography } from 'antd'

const { Title } = Typography

type PropsType = {
  selectedComponentId: string
  selectedComponentType: string
}

const ChartStat: FC<PropsType> = (props: PropsType) => {
  const { selectedComponentId, selectedComponentType } = props

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
  }, [selectedComponentId, surveyId, run])

  const { StatComponent } = getComponentConfByType(selectedComponentType) || {}

  if (StatComponent == null) return <div>该组件不需统计</div>

  return (
    <div>
      <Title level={3}>图表统计</Title>
      <StatComponent stat={stat} />
    </div>
  )
}

export default ChartStat
