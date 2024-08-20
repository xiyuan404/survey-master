import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ComponentPropsType } from 'src/components/SurveyComponents'

export type ComponentInfoType = {
  fe_id: string
  type: string
  title: string
  props: ComponentPropsType
}

export type ComponentsStateType = {
  componentList: Array<ComponentInfoType>
}

const INIT_STATE: ComponentsStateType = {
  componentList: [],
}

const componentsSlice = createSlice({
  name: 'components',
  initialState: INIT_STATE,
  reducers: {
    // 重置所有组件
    resetComponents: (state: ComponentsStateType, action: PayloadAction<ComponentsStateType>) => {
      return action.payload
    },
  },
})

export const { resetComponents } = componentsSlice.actions

export default componentsSlice.reducer
