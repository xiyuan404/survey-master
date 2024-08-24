import React, { FC, useState } from 'react'
import styles from './common.module.scss'
import SurveyCard, { SurveyCardPropsType } from 'src/components/SurveyCard'
import { Empty, Space, Spin, Typography } from 'antd'
import ListSearch from 'src/components/ListSearch'
import useLoadSurveyListData from 'src/hooks/useLoadSurveyListData'
import ListPagination from 'src/components/ListPagination'

const { Title } = Typography

const List: FC = () => {
  const { data: result = {}, loading, isFirstLoading } = useLoadSurveyListData({ isStar: true })

  const { list = [], total = 0 } = result

  return (
    <>
      <div className={styles.header}>
        <Title level={3}>header</Title>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {!loading && list.length <= 0 && <Empty description="暂无数据" />}
        {list.length > 0 &&
          list.map((item: SurveyCardPropsType) => <SurveyCard key={item._id} {...item} />)}
      </div>

      <div className={styles.footer}>
        <Space direction="vertical">
          {loading && (
            <div style={{ textAlign: 'center' }}>
              <Spin />
            </div>
          )}

          {!isFirstLoading && <ListPagination total={total} />}
        </Space>
      </div>
    </>
  )
}

export default List
