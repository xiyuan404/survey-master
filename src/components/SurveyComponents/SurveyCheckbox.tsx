import React, { FC, useEffect, useState } from 'react'

import styles from './SurveyCheckbox.module.scss'

/**
 *
 * checkbox 数据提交的特殊性
 * radio 一个name对应一个value
 * checkbox 一个name对应多个value
 */

type PropsType = {
  fe_id: string
  props: {
    title: string
    isVertical: boolean
    opts: Array<{
      label: string
      value: string
      checked: boolean
    }>
  }
}

const SurveyCheckbox: FC<PropsType> = ({
  fe_id,
  props: { title, isVertical, opts = [] },
}) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([])
  // 初始化时, 判定默认选中
  useEffect(() => {
    opts.forEach(({ value, checked }) => {
      if (checked) {
        setSelectedValues((oldValues) => oldValues.concat(value))
      }
    })
  }, [opts])

  const toggleChange = (value: string) => {
    if (selectedValues.includes(value)) {
      // 如果一件选中了，则取消选中
      setSelectedValues(selectedValues.filter((v) => v !== value))
    } else {
      // 如果未选中，则点击会选中
      setSelectedValues(selectedValues.concat(value))
    }
  }

  return (
    <>
      <p>{title}</p>
      <input type="hidden" name={fe_id} value={selectedValues.toString()} />
      <ul className={styles.list}>
        {opts.map(({ value, checked, label }) => {
          let liClassName = ''
          if (isVertical) {
            liClassName = styles.verticalItem
          } else {
            liClassName = styles.horizontalItem
          }

          return (
            <li key={value} className={liClassName}>
              <label>
                <input
                  type="checkbox"
                  value={value}
                  checked={selectedValues.includes(value)}
                  onChange={() => toggleChange(value)}
                />
                {label}
              </label>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default SurveyCheckbox
