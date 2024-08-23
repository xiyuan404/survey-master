import React, { FC, useState } from 'react'
import styles from './common.module.scss'
import SurveyCard from 'src/components/SurveyCard'
import { Empty, Typography } from 'antd'

const { Title } = Typography

const rawSurveyList = [
  {
    _id: 'item1',
    title: '问卷1',
    isPublished: false,
    isStar: true,
    answerCount: 1,
    createAt: '2024-8-14',
  },
  {
    _id: 'item2',
    title: '问卷1',
    isPublished: true,
    isStar: true,
    answerCount: 1,
    createAt: '2024-8-14',
  },
  {
    _id: 'item3',
    title: '问卷1',
    isPublished: false,
    isStar: true,
    answerCount: 1,
    createAt: '2024-8-14',
  },
]

const List: FC = () => {
  const [surveyList, setSurveyList] = useState(rawSurveyList)

  return (
    <>
      <div className={styles.header}>
        <Title level={3}>header</Title>
      </div>
      <div className={styles.content}>
        {surveyList.length <= 0 && <Empty />}
        {surveyList.length > 0 &&
          rawSurveyList.map(item => <SurveyCard key={item._id} {...item} />)}
      </div>
      <div className={styles.footer}>分页</div>
    </>
  )
}

export default List
