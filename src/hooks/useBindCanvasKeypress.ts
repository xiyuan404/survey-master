import { useKeyPress } from 'ahooks'
import { useDispatch } from 'react-redux'
import {
  copySelectedComponent,
  pasteSelectedComponent,
  removeSelectedComponent,
  selectNextComponent,
  selectPrevComponent,
} from 'src/store/componentsReducer'

import { ActionCreators as UndoActionCreators } from 'redux-undo'

/**
 *
 * @returns 没有选中form control
 */

const isActiveElementValid = () => {
  const activeElement = document.activeElement
  if (activeElement === document.body) return true
  if (document.activeElement?.matches("[role='button']")) return true

  return false
}

const useBindCanvasKeypress = () => {
  const dispatch = useDispatch()
  /* 
  const keybindingConf = [
    {
      keypress: ['delete', 'backspace'],
      bind: () => {
        if (!isActiveElementValid()) return
        dispatch(removeSelectedComponent())
      },
    },
  ] */

  useKeyPress(['delete', 'backspace'], () => {
    if (!isActiveElementValid()) return
    dispatch(removeSelectedComponent())
  })
  useKeyPress(['ctrl.c', 'meta.c'], () => {
    if (!isActiveElementValid()) return
    dispatch(copySelectedComponent())
  })
  useKeyPress(['ctrl.v', 'meta.v'], () => {
    if (!isActiveElementValid()) return
    dispatch(pasteSelectedComponent())
  })
  useKeyPress('uparrow', () => {
    if (!isActiveElementValid()) return
    dispatch(selectPrevComponent())
  })
  useKeyPress('downarrow', () => {
    if (!isActiveElementValid()) return
    dispatch(selectNextComponent())
  })
  useKeyPress(
    ['ctrl.z', 'meta.z'],
    () => {
      if (!isActiveElementValid()) return
      dispatch(UndoActionCreators.undo())
    },
    {
      exactMatch: true,
    }
  )
  useKeyPress(['ctrl.shift.z', 'meta.shift.z'], () => {
    if (!isActiveElementValid()) return
    dispatch(UndoActionCreators.redo())
  })
}

export default useBindCanvasKeypress
