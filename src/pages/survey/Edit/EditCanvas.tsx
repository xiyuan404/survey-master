import React, { FC, MouseEvent } from 'react'
import styles from './EditCanvas.module.scss'
// import SurveyTitle from 'src/components/SurveyComponents/SurveyTitle/Component'
// import SurveyInput from 'src/components/SurveyComponents/SurveyInput/Component'
import { Spin } from 'antd'
import classNames from 'classnames'
import useGetComponentInfo from 'src/hooks/useGetComponentInfo'
import { getComponentConfByType } from 'src/components/SurveyComponents'
import { changeSelectedId, ComponentInfoType, moveComponent } from 'src/store/componentsReducer'
import { useDispatch } from 'react-redux'
import { SortableContainer, SortableItem } from 'src/components/DragSortable'

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

  const dispatch = useDispatch()
  const handleClick = (e: MouseEvent, id: string) => {
    e.stopPropagation()
    dispatch(changeSelectedId(id))
  }

  // SortableContainer items 带上 id属性
  const componentListWithId = componentList.map(cmp => ({
    ...cmp,
    id: cmp.fe_id,
  }))

  // 拖拽排序结束
  const handleDragEnd = (oldIndex: number, newIndex: number) => {
    dispatch(moveComponent({ oldIndex, newIndex }))
  }

  return loading ? (
    <div style={{ textAlign: 'center', marginTop: '24px' }}>
      <Spin />
    </div>
  ) : (
    <SortableContainer items={componentListWithId} onDragEnd={handleDragEnd}>
      <div className={styles.canvas}>
        {componentList
          .filter(c => !c.isHidden)
          .map(c => {
            const { fe_id, isLocked } = c
            const wrapperDefaultClassName = styles['component-wrapper']
            const selectedClassName = styles.selected
            const lockedClassName = styles.locked
            const wrapperClassName = classNames({
              [wrapperDefaultClassName]: true,
              [selectedClassName]: fe_id === selectedId,
              [lockedClassName]: isLocked,
            })
            return (
              <SortableItem key={fe_id} id={c.fe_id}>
                <div className={wrapperClassName} onClick={e => handleClick(e, fe_id)}>
                  <div className={styles.component}>{getComponent(c)}</div>
                </div>
              </SortableItem>
            )
          })}
      </div>
    </SortableContainer>
  )
}

export default EditCanvas
