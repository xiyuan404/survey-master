import React, { FC } from 'react'
import styles from './SurveyInput.module.scss'

type PropsType = {
  fe_id: string
  props: {
    title: string
    placeholder?: string
  }
}

const SurveyInput: FC<PropsType> = ({ fe_id, props }) => {
  const { title, placeholder = '' } = props

  return (
    <>
      <p>{title}</p>
      <div className={styles.inputWrapper}>
        <input name={fe_id} placeholder={placeholder} />
      </div>
    </>
  )
}

export default SurveyInput
