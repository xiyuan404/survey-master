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
  return (
    <div className={styles.container}>
      <StatHeader title={title} />
      <div className={styles.content}>
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
        <div className={styles.right}>右</div>
      </div>
    </div>
  )
}

export default Stat
