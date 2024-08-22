import { useSelector } from 'react-redux'
import { StateType } from 'src/store'
import { PageInfoType } from 'src/store/pageInfoReducer'

const useGetPageInfo = () => {
  const pageInfo = useSelector<StateType>(state => state.pageInfo) as PageInfoType
  return pageInfo
}

export default useGetPageInfo
