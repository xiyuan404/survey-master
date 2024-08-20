import React, { FC, MouseEvent } from 'react'
import styles from './EditCanvas.module.scss'
// import SurveyTitle from 'src/components/SurveyComponents/SurveyTitle/Component'
// import SurveyInput from 'src/components/SurveyComponents/SurveyInput/Component'
import { Spin } from 'antd'
import classNames from 'classnames'
import useGetComponentInfo from 'src/hooks/useGetComponentInfo'
import { getComponentConfByType } from 'src/components/SurveyComponents'
import { changeSelectedId, ComponentInfoType } from 'src/store/componentsReducer'
import { useDispatch } from 'react-redux'

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
  const { componentList, selectedId } = useGetComponentInfo()
  // console.log('componentList', componentList)

  const dispatch = useDispatch()
  const handleClick = (e: MouseEvent, id: string) => {
    e.stopPropagation()
    dispatch(changeSelectedId(id))
  }

  return loading ? (
    <div style={{ textAlign: 'center', marginTop: '24px' }}>
      <Spin />
    </div>
  ) : (
    <div className={styles.canvas}>
      {componentList.map(c => {
        const { fe_id } = c
        const wrapperDefaultClassName = styles['component-wrapper']
        const selectedClassName = styles.selected
        const wrapperClassName = classNames({
          [wrapperDefaultClassName]: true,
          [selectedClassName]: fe_id === selectedId,
        })
        return (
          <div key={fe_id} className={wrapperClassName} onClick={e => handleClick(e, fe_id)}>
            <div className={styles.component}>{getComponent(c)}</div>
          </div>
        )
      })}
    </div>
  )
}

export default EditCanvas
