import React, { FC } from 'react'
import useGetComponentInfo from 'src/hooks/useGetComponentInfo'
import styles from './ComponentList.module.scss'
import { getComponentConfByType } from 'src/components/SurveyComponents'
import classNames from 'classnames'

type PropsType = {
  selectedComponentId: string
  setSelectedComponentId: (id: string) => void
  setSelectedComponentType: (type: string) => void
}

const ComponentList: FC<PropsType> = (props: PropsType) => {
  // 从Redux store中获取组件列表并显示
  const { componentList } = useGetComponentInfo()

  /**
   * 点击组件状态并修改selectedId和type,状态提升即可
   */
  const { selectedComponentId, setSelectedComponentId, setSelectedComponentType } = props

  return (
    <div className={styles.container}>
      {componentList.map(c => {
        const { props, type, fe_id } = c

        const componentConf = getComponentConfByType(type)
        if (componentConf == null) return null
        const { Component } = componentConf

        // 拼接wrapper classname
        const wrapperDefaultClassName = styles['component-wrapper']
        const selectedClassName = styles.selected
        const wrapperClassName = classNames({
          [wrapperDefaultClassName]: true,
          [selectedClassName]: selectedComponentId === fe_id,
        })

        return (
          <div
            key={fe_id}
            className={wrapperClassName}
            onClick={() => {
              setSelectedComponentId(fe_id)
              setSelectedComponentType(type)
            }}
          >
            <div className={styles.shield}>
              <Component {...props} />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ComponentList
