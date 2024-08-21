import { ComponentInfoType } from '.'

export const getNextSelectedId = (removeId: string, componentList: ComponentInfoType[]) => {
  if (!removeId) return ''
  const len = componentList.length
  if (len <= 1) return ''
  const removeIndex = componentList.findIndex(c => c.fe_id === removeId)
  let nextSelectedId = ''

  if (removeIndex + 1 !== len) {
    nextSelectedId = componentList[removeIndex + 1].fe_id
  } else {
    nextSelectedId = componentList[removeIndex - 1].fe_id
  }
  return nextSelectedId
}
