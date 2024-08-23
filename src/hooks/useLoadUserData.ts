import { useEffect, useState } from 'react'
import useGetUserInfo from './useGetUserInfo'
import { UserAPI } from 'src/service/user'
import { useRequest } from 'ahooks'
import { useDispatch } from 'react-redux'
import { loginReducer } from 'src/store/userReducer'

const useLoadUserData = () => {
  //返回加载状态
  const [waitingUserData, setWaitingUserData] = useState(true)

  const dispatch = useDispatch()

  // 加载用户信息
  const { run } = useRequest(UserAPI.get, {
    manual: true,
    onSuccess(result) {
      const { username, nickname } = result

      dispatch(
        loginReducer({
          username,
          nickname,
        })
      )
    },
    onFinally() {
      setWaitingUserData(false)
    },
  })

  // store 中是否已经存在用户信息
  const { username } = useGetUserInfo()
  useEffect(() => {
    // has already loaded?
    if (username) {
      setWaitingUserData(false)
      return
    }

    run()
  }, [username])

  return { waitingUserData }
}

export default useLoadUserData
