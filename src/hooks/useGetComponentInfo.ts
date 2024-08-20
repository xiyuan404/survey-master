import { useSelector } from 'react-redux'
import { StateType } from 'src/store'
import { ComponentsStateType } from 'src/store/componentsReducer'
function useGetComponentInfo() {
  const components = useSelector<StateType>(state => state.components) as ComponentsStateType

  const { componentList = [], selectedId } = components
  return {
    componentList,
    selectedId,
  }
}

export default useGetComponentInfo
