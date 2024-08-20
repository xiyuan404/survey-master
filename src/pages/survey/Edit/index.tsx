import React, { FC } from 'react'
import styles from './index.module.scss'
import EditCanvas from './EditCanvas'
import useLoadSurveyData from 'src/hooks/useLoadSurveyData'
const Edit: FC = () => {
  const { loading, error } = useLoadSurveyData()

  return (
    <div className={styles.container}>
      <div className={styles.header}>header</div>
      <div className={styles['content-wrapper']}>
        <div className={styles.content}>
          <div className={styles.left}>left</div>
          <div className={styles.main}>
            <div className={styles['canvas-wrapper']}>
              <EditCanvas loading={loading} />
            </div>
          </div>
          <div className={styles.right}>right</div>
        </div>
      </div>
    </div>
  )
}

export default Edit
