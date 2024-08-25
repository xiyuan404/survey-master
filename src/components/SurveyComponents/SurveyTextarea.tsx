import React, { FC } from 'react'
import styles from './SurveyTextarea.module.scss'

type PropsType = {
  fe_id: string
  props: {
    title: string
    placeholder?: string
  }
}

const SurveyTextarea: FC<PropsType> = ({ fe_id, props }) => {
  const { title, placeholder = '' } = props

  return (
    <>
      <p>{title}</p>
      <div className={styles.textareaWrapper}>
        <textarea name={fe_id} placeholder={placeholder} rows={5} />
      </div>
    </>
  )
}

export default SurveyTextarea
