import { useSelector } from 'react-redux'
import { StateType } from 'src/store'
import { UserStateType } from 'src/store/userReducer'

const useGetUserInfo = () => {
  const { username, nickname } = useSelector<StateType>(state => state.user) as UserStateType

  return { username, nickname }
}

export default useGetUserInfo
