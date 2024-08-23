import React, { FC } from 'react'
import styles from './common.module.scss'
import SurveyCard from 'src/components/SurveyCard'

const mockList = [
  {
    _id: 'item1',
    title: '问卷1',
    isPublished: false,
    isStar: false,
    answerCount: 1,
    createAt: '2024-8-14',
  },
  {
    _id: 'item2',
    title: '问卷1',
    isPublished: true,
    isStar: false,
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
  return (
    <>
      <div className={styles.header}>header</div>
      <div className={styles.content}>
        {mockList.map(mock => (
          <SurveyCard {...mock} />
        ))}
      </div>
      <div className={styles.footer}>加载更多</div>
    </>
  )
}

export default List
