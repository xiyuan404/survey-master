import { useKeyPress } from 'ahooks'
import { useDispatch } from 'react-redux'
import {
  copySelectedComponent,
  pasteSelectedComponent,
  removeSelectedComponent,
} from 'src/store/componentsReducer'

/**
 *
 * @returns 没有选中form control
 */

const isActiveElementValid = () => {
  const activeElement = document.activeElement
  if (activeElement === document.body) {
    return true
  }
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
}

export default useBindCanvasKeypress
