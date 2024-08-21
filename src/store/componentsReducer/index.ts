import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ComponentPropsType } from 'src/components/SurveyComponents'
import { produce } from 'immer'

import { getNextSelectedId, upsertComponent } from './utils'
import cloneDeep from 'lodash.clonedeep'
import { nanoid } from 'nanoid'

export type ComponentInfoType = {
  fe_id: string
  type: string
  title: string
  isHidden?: boolean
  isLocked?: boolean
  props: ComponentPropsType
}

export type ComponentsStateType = {
  selectedId: string
  componentList: Array<ComponentInfoType>
  copiedComponentInfo: ComponentInfoType | null
}

const INIT_STATE: ComponentsStateType = {
  componentList: [],
  selectedId: '',
  copiedComponentInfo: null,
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
        const newComponentInfo = action.payload

        upsertComponent(draft, newComponentInfo)
      }
    ),

    // 修改属性
    changeComponentProps: produce(
      (
        draft: ComponentsStateType,
        action: PayloadAction<{ fe_id: string; newProps: ComponentPropsType }>
      ) => {
        const { fe_id, newProps } = action.payload
        const selectedComponentInfo = draft.componentList.find(c => c.fe_id === fe_id)
        if (selectedComponentInfo) {
          selectedComponentInfo.props = {
            ...selectedComponentInfo.props,
            ...newProps,
          }
        }
      }
    ),

    // 删除选中组件
    removeSelectedComponent: produce((draft: ComponentsStateType) => {
      const { componentList, selectedId } = draft
      if (!selectedId) return

      const selectedIndex = componentList.findIndex(c => c.fe_id === selectedId)

      const nextSelectedId = getNextSelectedId(selectedId, componentList)
      draft.selectedId = nextSelectedId
      componentList.splice(selectedIndex, 1)
    }),

    // 隐藏/选中组件
    changeSelectedComponentToHidden: produce(
      (
        draft: ComponentsStateType,
        action: PayloadAction<{ currSelectedId: string; isHidden: boolean }>
      ) => {
        const { componentList, selectedId } = draft
        const { isHidden, currSelectedId } = action.payload
        if (!selectedId) return

        const nextSelectedId = getNextSelectedId(selectedId, componentList)
        draft.selectedId = nextSelectedId

        const currComponent = componentList.find(c => c.fe_id === currSelectedId)
        if (currComponent) {
          currComponent.isHidden = isHidden
        }
      }
    ),

    // 改变组件锁定状态
    toggleSelectedComponentLocked: produce((draft: ComponentsStateType) => {
      // debugger
      const { selectedId, componentList } = draft
      if (!selectedId) return
      const selectedComponentInfo = componentList.find(c => c.fe_id === selectedId)

      if (selectedComponentInfo) {
        selectedComponentInfo.isLocked = !selectedComponentInfo.isLocked
      }
    }),

    // 复制当前选中的组件
    copySelectedComponent: produce((draft: ComponentsStateType) => {
      const { selectedId, componentList } = draft
      if (!selectedId) return

      const selectedComponentInfo = componentList.find(c => c.fe_id === selectedId)
      if (selectedComponentInfo) {
        draft.copiedComponentInfo = cloneDeep(selectedComponentInfo)
      }
    }),

    // 黏贴到当前选中的组件后
    pasteSelectedComponent: produce((draft: ComponentsStateType) => {
      const { copiedComponentInfo } = draft
      if (copiedComponentInfo) {
        copiedComponentInfo.fe_id = nanoid()
        upsertComponent(draft, copiedComponentInfo)
      }
    }),
  },
})

export const {
  resetComponents,
  changeSelectedId,
  addComponent,
  changeComponentProps,
  removeSelectedComponent,
  changeSelectedComponentToHidden,
  toggleSelectedComponentLocked,
  copySelectedComponent,
  pasteSelectedComponent,
} = componentsSlice.actions

export default componentsSlice.reducer
