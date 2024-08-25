import React, { FC } from 'react'
import styles from './SurveyCheckbox.module.scss'

type PropsType = {
  fe_id: string
  props: {
    title: string
    isVertical: false
    list: Array<{
      value: string
      label: string
    }>
  }
}

const SurveyRadio: FC<PropsType> = ({
  fe_id,
  props: { title, isVertical, list },
}) => {
  return (
    <>
      <p> {title}</p>
      <ul className={styles.list}>
        {list.map((item) => {
          const { value, label } = item
          let liClassName = ''
          if (isVertical) {
            liClassName = styles.verticalItem
          } else {
            liClassName = styles.horizontalItem
          }

          return (
            <li key={value} className={liClassName}>
              <label>
                <input type="radio" name={fe_id} value={value} />
                {label}
              </label>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default SurveyRadio
