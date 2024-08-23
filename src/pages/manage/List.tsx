import React, { FC, useEffect, useState } from 'react'
import styles from './common.module.scss'
import SurveyCard, { SurveyCardPropsType } from 'src/components/SurveyCard'
import { Empty, Spin, Typography } from 'antd'
import ListSearch from 'src/components/ListSearch'
import { surveysAPI } from 'src/service/survey'

const { Title } = Typography

const List: FC = () => {
  // 不依赖useRequest版本获取问卷列表
  const [list, setList] = useState<SurveyCardPropsType[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    async function load() {
      setLoading(true)
      const data = await surveysAPI.list()
      const { list = [], total = 0 } = data
      setList(list)
      setTotal(total)
      setLoading(false)
    }
    load()
  }, [])

  return (
    <>
      <div className={styles.header}>
        <Title level={3} className={styles.left}>
          header
        </Title>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin />
          </div>
        )}
        {list.length <= 0 && <Empty />}
        {list.length > 0 && list.map(item => <SurveyCard key={item._id} {...item} />)}
      </div>
      <div className={styles.footer}>加载更多</div>
    </>
  )
}

export default List
