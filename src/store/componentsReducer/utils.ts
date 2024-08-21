import { ComponentInfoType, ComponentsStateType } from '.'

export const getNextSelectedId = (currSelectedId: string, componentList: ComponentInfoType[]) => {
  if (!currSelectedId) return ''
  const visibleComponentList = componentList.filter(c => !c.isHidden)
  const len = visibleComponentList.length
  if (len <= 1) return ''

  const removeIndex = visibleComponentList.findIndex(c => c.fe_id === currSelectedId)
  let nextSelectedId = ''

  if (removeIndex + 1 !== len) {
    nextSelectedId = visibleComponentList[removeIndex + 1].fe_id
  } else {
    nextSelectedId = visibleComponentList[removeIndex - 1].fe_id
  }

  return nextSelectedId
}

export function upsertComponent(draft: ComponentsStateType, newComponentInfo: ComponentInfoType) {
  const { selectedId, componentList } = draft

  if (selectedId !== '') {
    // 画布中选中了组件
    const addIdx = componentList.findIndex(c => c.fe_id === selectedId)
    componentList.splice(addIdx + 1, 0, newComponentInfo)
  } else {
    // 没有选择组件
    componentList.push(newComponentInfo)
  }
  return selectedId
}
