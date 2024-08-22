import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ComponentPropsType } from 'src/components/SurveyComponents'
import { produce } from 'immer'

import { getNextSelectedId, upsertComponent } from './utils'
import cloneDeep from 'lodash.clonedeep'
import { nanoid } from 'nanoid'
import { arrayMove } from '@dnd-kit/sortable'

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
    toggleComponentHidden: produce(
      (draft: ComponentsStateType, action: PayloadAction<{ toggleId: string }>) => {
        const { componentList, selectedId } = draft
        const { toggleId } = action.payload

        const toggleCmp = componentList.find(c => c.fe_id === toggleId)
        if (!toggleCmp) return
        const { isHidden } = toggleCmp

        let nextSelectedId = ''
        if (!isHidden) {
          nextSelectedId = getNextSelectedId(selectedId, componentList)
        } else {
          nextSelectedId = toggleId
        }
        draft.selectedId = nextSelectedId
        toggleCmp.isHidden = !isHidden
      }
    ),

    // 改变组件锁定状态
    toggleComponentLocked: produce(
      (draft: ComponentsStateType, action: PayloadAction<{ toggleId: string }>) => {
        // debugger
        const { componentList } = draft
        const { toggleId } = action.payload
        const selectedComponentInfo = componentList.find(c => c.fe_id === toggleId)

        if (selectedComponentInfo) {
          selectedComponentInfo.isLocked = !selectedComponentInfo.isLocked
        }
      }
    ),

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

    // 选中上一个组件
    selectPrevComponent: produce((draft: ComponentsStateType) => {
      const { selectedId, componentList } = draft
      if (selectedId === '') return

      const visibleComponentList = componentList.filter(c => !c.isHidden)

      const currIdx = visibleComponentList.findIndex(c => c.fe_id === selectedId)

      if (currIdx < 0) return

      const len = visibleComponentList.length

      const nextIdx = currIdx - 1 < 0 ? currIdx - 1 + len : currIdx - 1

      draft.selectedId = visibleComponentList[nextIdx].fe_id
    }),
    selectNextComponent: produce((draft: ComponentsStateType) => {
      const { selectedId, componentList } = draft

      if (selectedId === '') return
      const visibleComponentList = componentList.filter(c => !c.isHidden)

      const currIdx = visibleComponentList.findIndex(c => c.fe_id === selectedId)
      if (currIdx < 0) return

      const nextIdx = (currIdx + 1) % visibleComponentList.length
      draft.selectedId = visibleComponentList[nextIdx].fe_id
    }),

    // 改变组件标题
    changeComponentTitle: produce(
      (
        draft: ComponentsStateType,
        action: PayloadAction<{ changingTitleId: string; newTitle: string }>
      ) => {
        const { changingTitleId, newTitle } = action.payload

        const { componentList } = draft
        const cmpInfo = componentList.find(cmpInfo => cmpInfo.fe_id === changingTitleId)
        if (cmpInfo) {
          cmpInfo.title = newTitle
        }
      }
    ),

    // 移动组件位置
    moveComponent: produce(
      (
        draft: ComponentsStateType,
        action: PayloadAction<{ oldIndex: number; newIndex: number }>
      ) => {
        const { componentList } = draft
        const { oldIndex, newIndex } = action.payload
        draft.componentList = arrayMove(componentList, oldIndex, newIndex)
      }
    ),
  },
})

export const {
  resetComponents,
  changeSelectedId,
  addComponent,
  changeComponentProps,
  removeSelectedComponent,
  toggleComponentHidden,
  toggleComponentLocked,
  copySelectedComponent,
  pasteSelectedComponent,
  selectPrevComponent,
  selectNextComponent,
  changeComponentTitle,
  moveComponent,
} = componentsSlice.actions

export default componentsSlice.reducer
