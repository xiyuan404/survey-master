import { useTitle } from 'ahooks'
import { Button, Result, Spin } from 'antd'
import React, { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useGetPageInfo from 'src/hooks/useGetPageInfo'
import useLoadSurveyData from 'src/hooks/useLoadSurveyData'
import styles from './index.module.scss'
import StatHeader from './StatHeader'
import ComponentList from './ComponentList'
import PageStat from './PageStat'
import ChartStat from './ChartStat'

const Stat: FC = () => {
  const { loading } = useLoadSurveyData()
  const { title, isPublished } = useGetPageInfo()
  const nav = useNavigate()

  // 修改标题
  useTitle('问卷统计 - ' + title)

  // 状态提升 selected id 和 type
  const [selectedComponentId, setSelectedComponentId] = useState('')
  const [selectedComponentType, setSelectedComponentType] = useState('')

  /**
   * 当问卷信息还在加载时，显示loading indicator
   * Guard Clause
   */

  const LoadingElem = (
    <div style={{ textAlign: 'center' }}>
      <Spin />
    </div>
  )

  const renderContent = () => {
    if (typeof isPublished === 'boolean' && !isPublished)
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

    return (
      <>
        <div className={styles.left}>
          <ComponentList
            selectedComponentId={selectedComponentId}
            setSelectedComponentId={setSelectedComponentId}
            setSelectedComponentType={setSelectedComponentType}
          />
        </div>
        <div className={styles.main}>
          <PageStat
            selectedComponentId={selectedComponentId}
            setSelectedComponentId={setSelectedComponentId}
            setSelectedComponentType={setSelectedComponentType}
          />
        </div>
        <div className={styles.right}>
          <ChartStat
            selectedComponentId={selectedComponentId}
            selectedComponentType={selectedComponentType}
          />
        </div>
      </>
    )
  }

  return (
    <div className={styles.container}>
      <StatHeader title={title} />
      {loading && LoadingElem}
      {!loading && <div className={styles.content}>{renderContent()}</div>}
    </div>
  )
}

export default Stat
