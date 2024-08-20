import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ComponentPropsType } from 'src/components/SurveyComponents'
import { produce } from 'immer'

export type ComponentInfoType = {
  fe_id: string
  type: string
  title: string
  props: ComponentPropsType
}

export type ComponentsStateType = {
  selectedId: string
  componentList: Array<ComponentInfoType>
}

const INIT_STATE: ComponentsStateType = {
  componentList: [],
  selectedId: '',
}

const componentsSlice = createSlice({
  name: 'components',
  initialState: INIT_STATE,
  reducers: {
    // 重置所有组件
    resetComponents: (state: ComponentsStateType, action: PayloadAction<ComponentsStateType>) => {
      return action.payload
    },

    // 选中组件
    changeSelectedId: produce((draft: ComponentsStateType, action: PayloadAction<string>) => {
      draft.selectedId = action.payload
    }),

    // 添加组件
    addComponent: produce(
      (draft: ComponentsStateType, action: PayloadAction<ComponentInfoType>) => {
        const newComponent = action.payload

        const { selectedId } = draft
        if (selectedId !== '') {
          // 画布中选中了组件
          const addIdx = draft.componentList.findIndex(c => c.fe_id === selectedId)
          draft.componentList.splice(addIdx + 1, 0, newComponent)
        } else {
          // 没有选择组件
          draft.componentList.push(newComponent)
        }
        draft.selectedId = newComponent.fe_id
      }
    ),
  },
})

export const { resetComponents, changeSelectedId, addComponent } = componentsSlice.actions

export default componentsSlice.reducer
