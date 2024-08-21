import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { ComponentPropsType, getComponentConfByType } from 'src/components/SurveyComponents'
import useGetComponentInfo from 'src/hooks/useGetComponentInfo'
import { changeComponentProps } from 'src/store/componentsReducer'

const NoProp: FC = () => {
  return <div style={{ textAlign: 'center' }}>没有选中组件</div>
}

const ComponentProp: FC = () => {
  const { selectedId, selectedComponentInfo } = useGetComponentInfo()

  const { isLocked = false } = selectedComponentInfo || {}
  const dispatch = useDispatch()

  if (!selectedId) return <NoProp />

  if (!selectedComponentInfo) return <NoProp />
  const { type, props } = selectedComponentInfo

  const selectedComponentConf = getComponentConfByType(type)
  if (!selectedComponentConf) return <NoProp />
  const { PropsComponent } = selectedComponentConf

  const handleChange = (newProps: ComponentPropsType) => {
    const { fe_id } = selectedComponentInfo

    // console.log('newProps', fe_id, newProps)
    dispatch(changeComponentProps({ fe_id, newProps }))
  }

  return <PropsComponent {...props} onChange={handleChange} isLocked={isLocked} />
}

export default ComponentProp
