import { useTitle } from 'ahooks'
import { Button, Result, Spin } from 'antd'
import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import useGetPageInfo from 'src/hooks/useGetPageInfo'
import useLoadSurveyData from 'src/hooks/useLoadSurveyData'
import useLoadSurveyList from 'src/hooks/useLoadSurveyListData'
const Stat: FC = () => {
  const { loading } = useLoadSurveyData()
  const { title, isPublished } = useGetPageInfo()
  const nav = useNavigate()

  // 修改标题
  useTitle('问卷统计 - ' + title)

  /**
   * 当问卷信息还在加载时，显示loading indicator
   * Guard Clause
   */

  if (loading)
    return (
      <div style={{ textAlign: 'center' }}>
        <Spin />
      </div>
    )

  /**
   * (early Return Pattern)
   *  当前页面未发布时，不继续渲染问卷统计页
   */
  if (!isPublished)
    return (
      <Result
        status="warning"
        title="当前页面还未存在"
        extra={
          <Button type="primary" onClick={() => nav(-1)}>
            返回
          </Button>
        }
      />
    )
  return <div>stat</div>
}

export default Stat
