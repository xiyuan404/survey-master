import React, { FC, useState } from 'react'
import styles from './common.module.scss'
import SurveyCard, { SurveyCardPropsType } from 'src/components/SurveyCard'
import { Empty, Spin, Typography } from 'antd'
import ListSearch from 'src/components/ListSearch'
import useLoadSurveyListData from 'src/hooks/useLoadSurveyListData'
import ListPagination from 'src/components/ListPagination'

const { Title } = Typography

const List: FC = () => {
  const { data: result = {}, loading } = useLoadSurveyListData({ isStar: true })

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
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin />
          </div>
        )}
        {!loading && list.length <= 0 && <Empty description="暂无数据" />}
        {list.length > 0 &&
          list.map((item: SurveyCardPropsType) => <SurveyCard key={item._id} {...item} />)}
      </div>
      <div className={styles.footer}>
        <ListPagination total={total} />
      </div>
    </>
  )
}

export default List
