import { useSelector } from 'react-redux'
import { StateType } from 'src/store'
import { ComponentsStateType } from 'src/store/componentsReducer'
function useGetComponentInfo() {
  const components = useSelector<StateType>(state => state.components) as ComponentsStateType

  const { componentList = [], selectedId } = components

  const selectedComponentInfo = componentList.find(c => c.fe_id === selectedId)

  return {
    componentList,
    selectedId,
    selectedComponentInfo,
  }
}

export default useGetComponentInfo
