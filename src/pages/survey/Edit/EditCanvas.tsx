import React, { FC } from 'react'

import styles from './EditCanvas.module.scss'
import SurveyTitle from 'src/components/SurveyComponents/SurveyTitle/Component'
import SurveyInput from 'src/components/SurveyComponents/SurveyInput/Component'
import { Spin } from 'antd'
import useGetComponentInfo from 'src/hooks/useGetComponentInfo'
import { getComponentConfByType } from 'src/components/SurveyComponents'
import { ComponentInfoType } from 'src/store/componentsReducer'

type PropsType = {
  loading: boolean
}

function getComponent(componentInfo: ComponentInfoType) {
  const { type, props } = componentInfo

  const componentConf = getComponentConfByType(type)
  if (!componentConf) return null
  const { Component } = componentConf
  return <Component {...props} />
}

const EditCanvas: FC<PropsType> = ({ loading }) => {
  const { componentList } = useGetComponentInfo()
  console.log('componentList', componentList)

  return loading ? (
    <div style={{ textAlign: 'center', marginTop: '24px' }}>
      <Spin />
    </div>
  ) : (
    <div className={styles.canvas}>
      {componentList.map(c => {
        return (
          <div key={c.fe_id} className={styles['component-wrapper']}>
            <div className={styles.component}>{getComponent(c)}</div>
          </div>
        )
      })}
    </div>
  )
}

export default EditCanvas
