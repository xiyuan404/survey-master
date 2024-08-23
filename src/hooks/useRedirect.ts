import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useGetUserInfo from './useGetUserInfo'
import {
  HOME_PATHNAME,
  isLoginOrRegisterPage,
  isNoNeedUserInfo,
  LOGIN_PATHNAME,
  MANAGE_INDEX_PATHNAME,
} from 'src/router'

const useRedirect = (waitingUserData: boolean) => {
  const { pathname } = useLocation()
  const nav = useNavigate()

  const { username } = useGetUserInfo()

  useEffect(() => {
    if (waitingUserData) return

    // 已经登录了
    if (username) {
      if (isLoginOrRegisterPage(pathname)) {
        nav(MANAGE_INDEX_PATHNAME)
      }
      return
    }

    // 未登录
    if (!isNoNeedUserInfo(pathname)) {
      nav(LOGIN_PATHNAME)
    }
  }, [waitingUserData, username, pathname]) //加载用户信息状态，登录状态改变或页面跳转要重新判定

  return
}

export default useRedirect
