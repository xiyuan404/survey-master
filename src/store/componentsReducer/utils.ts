import { ComponentInfoType } from '.'

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
